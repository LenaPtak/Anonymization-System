import io
import re
from typing import List, Tuple, Union

import fitz
from PIL import Image

from regexes import polish_sensitive, regexes_global


def _get_sensitive_data(text: str, chosen_regexes: list = None) -> Tuple[str, str]:
    """
    This function look for regular expressions in given text.

    :param text: Source text, passed as string with possible newlines.
    :return: Generator of matches in form (regex_name: str, match: str)
    """
    regexes = regexes_global
    if chosen_regexes:
        regexes = {
            key: regexes_global[key]
            for key in [regex for regex in chosen_regexes if regex in regexes_global.keys()]
        }

    for line in text.split("\n"):
        for regex_name, regex_pattern in regexes.items():

            line_joined = "".join(line.split())
            if re.search(regex_pattern, line_joined, re.IGNORECASE):
                search = re.search(".*", line, re.IGNORECASE)
                yield regex_name, search.group()

            for word in line.split():
                if re.search(regex_pattern, word, re.IGNORECASE):
                    search = re.search(regex_pattern, word, re.IGNORECASE)
                    yield regex_name, search.group()

            if re.search(regex_pattern, line, re.IGNORECASE):
                search = re.search(regex_pattern, line, re.IGNORECASE)
                yield regex_name, search.group()


class PDF:
    def __init__(self, filepath):
        self.filepath = filepath
        self.filename = filepath.replace("/", "_").split(".")[-2][1:]

        with fitz.open(self.filepath) as doc:
            self.page_count = doc.page_count
            self.producer = doc.metadata["producer"]
            self.file_format = doc.metadata["format"]
            self.keywords = doc.metadata["keywords"]
            self.title = doc.metadata["title"]
            self.creator = doc.metadata["creator"]
            self.subject = doc.metadata["subject"]

    def make_file(self):
        """Funkcja make_file zapisuje zawartość tekstową PDFu do pliku tekstowego"""
        with fitz.open(self.filepath) as doc:
            with open("raw_text.txt", "wb") as out:
                for page in doc:  # iterate the document pages
                    text = page.get_text(sort=True).encode("utf8")  # get plain text (is in UTF-8)
                    out.write(text)  # write text of page
                    out.write(bytes((12,)))  # write page delimiter (form feed 0x0C)

    def make_template(self):
        """Funkcja make_template zapisuje szablon PDFu"""
        with fitz.open(self.filepath) as doc:
            page = doc[0]
            paths = page.get_drawings()

            with fitz.open() as out_file:
                out_page = out_file.new_page(width=page.rect.width, height=page.rect.height)
                shape = out_page.new_shape()
                for path in paths:
                    for item in path["items"]:
                        if item[0] == "l":  # line
                            shape.draw_line(item[1], item[2])
                        elif item[0] == "re":  # rectangle
                            shape.draw_rect(item[1])
                        elif item[0] == "qu":  # quad
                            shape.draw_quad(item[1])
                        elif item[0] == "c":  # curve
                            shape.draw_bezier(item[1], item[2], item[3], item[4])
                        else:
                            raise ValueError("unhandled drawing", item)

                    shape.finish(
                        fill=path["fill"],  # fill color
                        color=path["color"],  # line color
                        dashes=path["dashes"],  # line dashing
                        even_odd=path.get("even_odd", True),  # control color of overlaps
                        closePath=path["closePath"],  # whether to connect last and first point
                        lineJoin=path["lineJoin"],  # how line joins should look like
                        lineCap=max(path["lineCap"]),  # how line ends should look like
                        width=path["width"],  # line width
                        stroke_opacity=path.get("stroke_opacity", 1),  # same value for both
                        fill_opacity=path.get("fill_opacity", 1),  # opacity parameters
                    )
                shape.commit()
                out_file.save("drawings-page-0.pdf")

    def get_table_of_contents(self):
        """Funkcja get_table_of_contents ładuje spis treści PDFu"""
        with fitz.open(self.filepath) as doc:
            return doc.get_toc()

    def get_text(self, arg="text") -> Union[str, List[Union[tuple, dict]]]:
        """
        Funkcja get_text zbiera wszystkie dane tekstowe jakie odnajdzie w PDF

        text:    (domyślnie) czysty tekst ze znakami nowej linii. Bez informacji o współrzędnych, bez obrazków.
        blocks:  generuje listę bloków tekstowych (= paragrafów).
        words:   generuje listę słów (stringów niezawierających spacji).

        html:    generuje template HTML, włącznie z obrazkami
        dict:    lub “json”: zawiera ten sam poziom informacji co  HTML, ale ma postać słownika python
        rawdict: lub "rawjson": rozszerzenie poprzedniego 'dict', dodatkowe informacje o fontach etc.
        xhtml:   generuje ten sam poziom informacji co 'text', ale zawiera dodatkowo obrazki, postać html
        xml:     rozszerzenie powyższego informacjami o fontach etc.

        :param arg: Jedna z ośmiu możliwych wartości tekstowych decydująca o przetwarzaniu wyniku
        :return: Odpowiednio sformatowany string zawierający znaleziony w PDF teks
        """
        if arg in ("html", "text", "html", "xhtml", "xml"):
            result = ""
            with fitz.open(self.filepath) as doc:
                for page in doc:
                    result += page.get_text(arg)
            return result
        else:
            result = []
            with fitz.open(self.filepath) as doc:
                for page in doc:
                    result.extend(page.get_text(arg))
        return result

    def get_links(self) -> list[dict]:
        """
        Funkcja get_links zbiera wszystkie linki jakie odnajdzie w PDF

        :return: Lista słowników zawierających informacje o znalezionych linkach
        """
        result = []
        with fitz.open(self.filepath) as doc:
            for page in doc:
                result.extend(page.get_links())
        return result

    def _get_pixmap(self, dpi):
        with fitz.open(self.filepath) as doc:
            return [page.get_pixmap(dpi=dpi) for page in doc]

    def save_pages_as_svg(self):
        """Funkcja save_pages_as_svg zapisuje PDF w postaci plików SVG"""
        with fitz.open(self.filepath) as doc:
            for page_number, page in enumerate(doc):
                with open(f"{self.filename}_{page_number}.svg", "w") as file:
                    file.write(page.get_svg_image())

    def save_pages_as_png(self, good_quality=True):
        """
        Funkcja save_pages_as_png zapisuje PDF w postaci plików PNG

        :param good_quality: Ustawione na True zapisze pliki PNG w większej rozdzielczości
        """
        for page_number, pix in enumerate(self._get_pixmap(dpi=500 if good_quality else 100)):
            pix.save(f"{self.filename}_{page_number}_{500 if good_quality else 100}_dpi.png")

    def search_for_words(self, args: list[str]) -> dict[list[fitz.Rect]]:
        """
        Funkcja search_for_words wyszukuje w PDFie podane w liście wyrażenia tekstowe i zwraca ich współrzędne

        :param args: Lista słów/wyrażeń do wyszukania
        :return: Słownik zawierający współrzędne wyrażeń tekstowych w postaci obiektów Rect
        """
        with fitz.open(self.filepath) as doc:
            return {
                arg: page.search_for(arg, quads=True)
                for page in doc
                for arg in set(args)
            }

    def highlight_text(self, args: list[str]):
        """
        Funkcja highlight_text zaznacza w PDFie podane w liście wyrażenia tekstowe i zapisuje do nowego PDFu

        :param args: Lista słów/wyrażeń do zaznaczenia
        """
        with fitz.open(self.filepath) as doc:
            for page in doc:
                for arg in args:
                    res = page.search_for(arg, quads=True)
                    page.add_highlight_annot(res)
            doc.save("highlighted.pdf")

    def hide_text(self, args: list[str], path: str = "hidden.pdf"):
        """
        Funkcja hide_text ukrywa w PDFie podane w liście wyrażenia tekstowe i zapisuje do nowego PDFu

        :param args: Lista słów/wyrażeń do zaznaczenia
        :param path: Scieżka do zapisu przetworzonego pliku
        """
        with fitz.open(self.filepath) as doc:
            for page in doc:
                for arg in args:
                    areas = page.search_for(arg)
                    [
                        page.add_redact_annot(
                            area,
                            text="XXX",
                            fontsize=6,
                            align=fitz.TEXT_ALIGN_CENTER,
                            fill=(0.9, 0.9, 0.9),
                        )
                        for area in areas
                    ]
                    page.apply_redactions()
            doc.save(path)

    def hide_sensitive(self, path: str = "sensitive.pdf"):
        """
        Funkcja hide_sensitive ukrywa w PDFie wrażliwe wyrażenia tekstowe i zapisuje do nowego PDFu

        :param path: Scieżka do zapisu przetworzonego pliku
        """
        chosen_regexes = [
            "Numer PESEL",
            "Numer dowodu osobistego",
            "Numer karty kredytowej",
            "Numer NIP",
            "Numer telefonu",
            "Numer rachunku bankowego",
            "Email address",
            "Home address",
            "Date type 1",
            "Date type 2",
            "Date type 3",
            "Date type 4",
            "Date type 5",
            "Date type 6",
            "Date type 7",
            "Date type 8",
            "Date type 9",
            "Date type 10",
            "Date type 11",
            "Date type 12",
            "Date type 13",
            "Date type 14",
            "Date type 15",
            "Date type 15",
            "Date type 16",
            "Date type 17",
            "Date type 19",
            "Date type 20",
            "Date type 21",
            "Date type 22",
            "Date type 23",
            "Date type 24",
            "Date type 25",
            "Date type 26",
            "Date type 27",
            "Date type 28",
            "Date type 29",
            "Date type 30",
            "Date type 31",

        ]

        with fitz.open(self.filepath) as doc:
            for page in doc:
                sensitive = _get_sensitive_data(
                    page.get_text("text"), chosen_regexes=chosen_regexes
                )
                for datatype, word in set(sensitive) :
                    if areas := page.search_for(word, quads=True):
                        for area in areas:
                            page.add_redact_annot(
                                area,
                                text=len(word) * "*",
                                fontsize=10,
                                align=fitz.TEXT_ALIGN_CENTER,
                                fill=(0.8, 0.8, 0.8),
                            )

                        page.apply_redactions(
                            images=fitz.PDF_REDACT_IMAGE_NONE
                        )


                for line in page.get_text("text").split("\n"):
                    for word in line.split():
                        if word in polish_sensitive or word.upper() in polish_sensitive or word.capitalize() in polish_sensitive:
                            print(f"{word} in polish")
                            areas = page.search_for(word, quads=True)
                            for area in areas:
                                page.add_redact_annot(
                                    area,
                                    text=len(word) * "*",
                                    fontsize=10,
                                    align=fitz.TEXT_ALIGN_CENTER,
                                    fill=(0.8, 0.8, 0.8),
                                )
                                page.apply_redactions(images=fitz.PDF_REDACT_IMAGE_NONE)

                # TODO : higher garbage might make yolo problems
                doc.save(path, deflate=True, garbage=1)

    def extract_images(self) -> list[str]:
        """
        Funkcja extract_images wyszukuje w PDFie obrazki i zapisuje je w folderze /images
        :return: Lista nazw obrazków znalezionych podczas procesowania dla badanego pliku PDF
        """
        images_in_pdf = []
        xrefs = []
        with fitz.open(self.filepath) as doc:
            for page_index, page in enumerate(doc):
                for image_index, img in enumerate(page.get_images(), start=1):
                    xref = img[0]  # get the XREF of the image
                    base_image = doc.extract_image(xref)
                    image_bytes = base_image["image"]  # extract the image bytes
                    image_ext = base_image["ext"]  # get the image extension
                    image = Image.open(io.BytesIO(image_bytes))  # load it to PIL
                    image_name = f"images/{self.filename}_{page_index}_{image_index}.{image_ext}"
                    images_in_pdf.append(image_name)
                    xrefs.append(xref)
                    image.save(open(image_name, "wb"))
                    print(xref)
        return (images_in_pdf, xrefs)

    def reintroduce_image(self, path, xref):
        with fitz.open(self.filepath) as doc:
            for page_index, page in enumerate(doc):
                page.clean_contents()
                for image_index, img in enumerate(page.get_images(), start=1):
                    if img[0] == xref:
                        bbox = page.get_image_bbox(img[7])
                        page.apply_redactions(images=fitz.PDF_REDACT_IMAGE_REMOVE)
                        page.insert_image(bbox, filename=path)
            doc.saveIncr()


class TXT:
    def __init__(self, filepath):
        self.filepath = filepath
        self.filename = filepath.replace("/", "_").split(".")[-2][1:]

    def hide_sensitive(self, path: str) -> None:
        """
        This method hide sensitive data in 'plain/text' file based on predefined regexes.

        :param path: Path for allocating processed file.
        """
        chosen_regexes = [
            "Numer PESEL",
            "Numer dowodu osobistego",
            "Numer karty kredytowej",
            "Numer NIP",
            "Numer telefonu",
            "Numer rachunku bankowego",
            "Email address",
        ]

        with open(self.filepath) as file:
            text = file.read()
            sensitive = _get_sensitive_data(
                text=text, chosen_regexes=chosen_regexes
            )

        with open(path, "w+") as file:
            for _, word in set(sensitive):
                text = text.replace(word, f"**XXX**")
            file.write(text)

    def hide_text(self, args: list[str], path: str):
        """
        This method hide sensitive data in 'plain/text' file based on given list of phrases.

        :param args: List of phrases to hide
        :param path: Path for allocating processed file
        """
        with open(self.filepath) as file:
            text = file.read()

        with open(path, "w+") as file:
            for phrase in set(args):
                text = text.replace(phrase, f"**XXX**")
            file.write(text)


class PNG:
    pass


class JPG:
    pass
