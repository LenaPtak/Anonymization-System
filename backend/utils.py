import os
import cv2
import logging
import string

from fastapi import HTTPException, status
from starlette.responses import FileResponse

from backend.machinelearning.yolo_wrapper import YoloWrapper
from backend.pydantics import UserFile, Config
from backend.pdf import PDF, TXT, JPG, PNG
from backend.consts import (
    CONTENT_TYPE_TO_PATH_MAP,
    TXT_DIR_PATH,
    PDF_DIR_PATH,
    PNG_DIR_PATH,
    JPG_DIR_PATH,
    IMG_DIR_PATH, RAP_DIR_PATH,
)


def _map_expressions_from_list(expressions: list):
    all_cases_expressions = []
    for expression in set(expressions):
        all_cases_expressions.extend([
            expression.capitalize(),
            expression.casefold(),
            expression.lower(),
            expression.upper(),
            expression.rstrip(),
            expression.lstrip(),
            ''.join(e for e in expression if e.isalnum()),
            expression[:-1] if not expression[-1].isalnum() else expression,
            expression[1:] if not expression[0].isalnum() else expression,
            expression[1:-1] if not expression[-1].isalnum() and not expression[0].isalnum() else expression,
            expression
        ])
    # for punc in [",", ".", " "]:
    #     for expression in all_cases_expressions:
    #         all_cases_expressions.extend([
    #             expression + punc,
    #             punc + expression,
    #             punc + expression + punc
    #         ])

    return list(set(all_cases_expressions))



async def process_file(file: UserFile, config: Config) -> tuple[FileResponse, list | None | None]:
    """
    Main file processing function
    """
    processed_type = file.type
    processed_name = "processed_" + file.unique_name
    processed_path = CONTENT_TYPE_TO_PATH_MAP[file.type] + processed_name
    raport = []

    if processed_type == "application/pdf":
        hide_people = True

        if config:
            # Look for this particular file expected result type
            result_type = processed_type
            for file_config in config.file_configs:
                if file_config.unique_name == file.unique_name:
                    result_type = file_config.result_type

            processed_path = CONTENT_TYPE_TO_PATH_MAP[result_type] + processed_name
            hide_people = config.hide_people

            pdf_config = {
                "regex_categories": [regex.upper() for regex in config.regex_categories],
                "expressions_to_anonymize": _map_expressions_from_list(config.expressions_to_anonymize),
                "expressions_to_highlight": _map_expressions_from_list(config.expressions_to_highlight),
                "hide_people": config.hide_people,
                "make_raport": config.make_raport,
                "result_type": result_type.lower()
            }
            pdf = PDF(filepath=file.location, **pdf_config)
        else:
            pdf = PDF(filepath=file.location)

        paths, xrefs = pdf.extract_images()
        if hide_people and paths and xrefs:
            raport += [f"\nHidden people profiles:\n - {len(paths)}\n"]
            if paths and xrefs:
                yolo_wrapper = YoloWrapper()
                for path, xref in zip(paths, xrefs):
                    image = cv2.imread(path)
                    if path[-4:].lower() == '.png':
                        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
                    results = yolo_wrapper.model(image)
                    image = yolo_wrapper.process_results(results, image)
                    cv2.imwrite(path, image)

                    pdf_raport = pdf.hide_sensitive(processed_path)
                    if pdf_raport:
                        raport += pdf_raport

                    pdf_processed = PDF(processed_path)
                    pdf_processed.reintroduce_image(path, xref)
        else:
            pdf_raport = pdf.hide_sensitive(processed_path)
            if pdf_raport:
                raport += pdf_raport

    elif processed_type == "text/plain":
        if config:
            txt_config = {
                "regex_categories": [regex.upper() for regex in config.regex_categories],
                "expressions_to_anonymize": _map_expressions_from_list(config.expressions_to_anonymize),
                "expressions_to_highlight": _map_expressions_from_list(config.expressions_to_highlight),
                "make_raport": config.make_raport,
            }
            txt = TXT(filepath=file.location, **txt_config)
        else:
            txt = TXT(filepath=file.location)

        txt_raport = txt.hide_sensitive(processed_path)
        if txt_raport:
            raport += txt_raport

    elif processed_type == 'image/jpeg':
        if config:
            hide_people = config.hide_people

            img_config = {
                "regex_categories": [regex.upper() for regex in config.regex_categories],
                "expressions_to_anonymize": _map_expressions_from_list(config.expressions_to_anonymize),
                "expressions_to_highlight": _map_expressions_from_list(config.expressions_to_highlight),
                "hide_people": config.hide_people,
                "make_raport": config.make_raport,
            }
            image_processor = JPG(filepath=file.location, **img_config)
        else:
            image_processor = JPG(filepath=file.location)
        image_processor.hide_sensitive()
        image_processor.save_image(processed_path)
    elif processed_type == 'image/png':
        if config:
            hide_people = config.hide_people

            img_config = {
                "regex_categories": [regex.upper() for regex in config.regex_categories],
                "expressions_to_anonymize": _map_expressions_from_list(config.expressions_to_anonymize),
                "expressions_to_highlight": _map_expressions_from_list(config.expressions_to_highlight),
                "hide_people": config.hide_people,
                "make_raport": config.make_raport,
            }
            image_processor = PNG(filepath=file.location, **img_config)
        else:
            image_processor = PNG(filepath=file.location)
        image_processor.hide_sensitive()
        image_processor.save_image(processed_path)

    else:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="Currently only pdf processing is possible.",
        )
    response_file = FileResponse(
        path=processed_path,
        filename=processed_name,
        media_type=processed_type,
    )
    return response_file, raport


def delete_files_from_storage(files_to_delete: list[str] = None):
    """
    Deletes files correlated with session and given filenames.
    Returns response with information about deleted files.
    """
    for context in [
        TXT_DIR_PATH,
        PDF_DIR_PATH,
        PNG_DIR_PATH,
        JPG_DIR_PATH,
        IMG_DIR_PATH,
        RAP_DIR_PATH,
    ]:
        files = os.listdir(context)
        for file in files:
            if files_to_delete and file not in files_to_delete:
                continue
            os.remove(context + file)
            logging.info(f"File: {file} have been deleted.")


def _generate_raport_file_header(data: dict):
    raport_head = f"\n{'============================' * 2}\n"
    raport_name = f"File name  : {data.get('origin_name')}\n"
    raport_type = f"File type  : {data.get('type')}       \n"
    raport_size = f"File size  : {data.get('size')}       \n"
    raport_time = f"Created at : {data.get('date')}       \n"
    raport_tail = f"{'============================' * 2}\n\n"
    return raport_head + raport_name + raport_type + raport_size + raport_time + raport_tail


def convert_bytes(num: float) -> str:
    """
    Coverts byte file size to human-readable string.
    """
    for x in ["bytes", "KB", "MB", "GB", "TB"]:
        if num < 1024.0:
            return "%3.1f %s" % (num, x)
        num /= 1024.0
