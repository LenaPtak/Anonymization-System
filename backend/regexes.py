import os

# Load polish sensitive words into set at the very beggining
polish_sensitive = set()
files = os.listdir("blobs/")
for num, file in enumerate(files):
    with open(os.path.join("blobs/", file), "r") as file:
        for line in file:
            if len(line) > 4:
                polish_sensitive.add(line.rstrip())


regexes_global = {
    "U.S.Social Security No": r"(\b(?!000|666|9\d{2})([0-8]\d{2}|7([0-6]\d))([-]?|\s{1})(?!00)\d\d\2(?!0000)\d{4}\b)",
    "IPV4 address": r"(^\d{1,3}[.]\d{1,3}[.]\d{1,3}[.]\d{1,3}$)",
    "Dates in MM/DD/YYYY format": r"(^([1][12]|[0]?[1-9])[\/-]([3][01]|[12]\d|[0]?[1-9])[\/-](\d{4}|\d{2})$)",
    "MasterCard number": r"(^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$)",
    "Visa card number": r"(\b([4]\d{3}[\s]\d{4}[\s]\d{4}[\s]\d{4}|[4]\d{3}[-]\d{4}[-]\d{4}[-]\d{4}|[4]\d{3}[.]\d{4}[.]\d{4}[.]\d{4}|[4]\d{3}\d{4}\d{4}\d{4})\b)",
    "American Express card number": r"(^3[47][0-9]{13}$)",
    "U.S. ZIP code": r"(^((\d{5}-\d{4})|(\d{5})|([A-Z]\d[A-Z]\s\d[A-Z]\d))$)",
    "File path": r"(\\[^\\]+$	)",
    "Dollar amount": r"(\$[0-9]*.[0-9][0-9])",
    "Date type 1": r"([0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\})",  # 2003-08-06
    "Date type 2": r"([A-Z][a-z][a-z] [0-9][0-9]*, [0-9]\{4\})",  # Jan 3, 2003
    "Date type 3": r"(^(\d{1,2})\/(\d{1,2})\/(\d{2}|(19|20)\d{2})$)",  # DD/MM/YY or DD/MM/YYYY or MM/DD/YY or MM/DD/YYYY # noqa E501
    "Phone No.": r"((^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$))",
    "Credit card": r"(^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6011[0-9]{12}|622((12[6-9]|1[3-9][0-9])|([2-8][0-9][0-9])|(9(([0-1][0-9])|(2[0-5]))))[0-9]{10}|64[4-9][0-9]{13}|65[0-9]{14}|3(?:0[0-5]|[68][0-9])[0-9]{11}|3[47][0-9]{13})*)$",
    "Health insurance No.": r"(^[A-Z]{3}[0-9]{6}[A-Z][0-9]{2}$)",
    "Passport No.": r"(^[A-Z]{2}[0-9]{7}$)",
    "Cell phone No.": r"(^\+[0-9]{2}[0-9]{9}$)",
    "Email address 2": r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)",
    "PESEL": r"(^[0-9]{11}$)",
    "Date of birth": r"(^[0-9]{2}/[0-9]{2}/[0-9]{4}$)",
    "ID No.": r"(^[A-Z]{3}[0-9]{6}$)",
    "NIP": r"(^[0-9]{10}$)",
    "REGON": r"(^[0-9]{9}$)",
    "Bank account No.": r"(^[0-9]{26}$)",
    "Passport number": r"(^[A-Z]{2}\d{7}$)",
    "Driver's license number": r"(^[A-Z]\d{7}$)",
    "National identification number": r"(^\d{3}\s\d{3}\s\d{3}$)",
    "National insurance number": r"(^[A-Z]{2}\s\d{6}[A-Z]$)",
    "National Health Service number": r"(^[A-Z]{3}\d{6}[A-Z]{2}$)",
    "Credit card security code(CVV)": r"(^\d{3,4}$)",
    "Date of birth 2": r"(^\d{2}/\d{2}/\d{4}$)",
    "Age": r"(^[1-9]\d{1,2}$)",
    "Home address": r"(^\d{1,4}\s[A-Z][a-z]+(\s[A-Z][a-z]+)*$)",
    "Emergency contact": r"(^[A-Z][a-z]+(\s[A-Z][a-z]+)\s\d{1,4}\s[A-Z][a-z]+(\s[A-Z][a-z]+)$)",
    "Different - might delete": r"(^[A-Z][a-z]+(\s[A-Z][a-z]+)*$)",
    "Income": r"(^[1-9]\d*$)",
    "Blood type": r"(^[A-Z]$)",
    "Passwords": r"(^[A-Za-z0-9@#$%^&+=]{8,}$)",
    "Bank account numbers": r"(^[A-Z]{2}\d{6,10}$)",
    "Credit card numbers": r"(^\d{4}\s\d{4}\s\d{4}\s\d{4}$)",
    "Invoice numbers": r"(^[A-Z]{2,4}-+[0-9]{4,12}$)",
    "Transaction amounts": r"(^$\d+(,\d{3})*(.\d{2})?$)",
    "Personal identification numbers (PINs)": r"(^\d{4,6}$)",
    "Numer PESEL": r"(\b[0-9]{11}\b)",
    "Numer dowodu osobistego": r"(\b[A-Z]{3}\d{6}\b)",
    "Numer karty kredytowej": r"(\b(\d{4}\s){3}\d{4}\b)",
    "Numer NIP": r"(\b\d{10}\b)",
    "Numer telefonu": r"(\b\+48\s[0-9]{3}\s[0-9]{3}\s[0-9]{3}\b)",
    "Numer rachunku bankowego": r"(\b\d{26}\b)",
    "Data urodzenia": r"(\b\d{2}\/\d{2}\/\d{4}\b)",
    "Imię/Nazwisko": r"(\b[A-Z][a-z]+(\s[A-Z][a-z]+)*\b)",
    "Numer faktury/polisy/zamowienia": r"(\b[A-Z]{2}\d{8}\b)",
    "Kwota": r"(\b\d+(,\d{3})*(\.\d{2})?\b)",
    "Numer REGON": r"(\b\d{9}\b)",
    "Adres firmy": r"(\b\d{1,4}\s[A-Z][a-z]+(\s[A-Z][a-z]+)*\b)",
    "Kwota 2": r"(\b\d+(,\d{3})*(.\d{2})?\b)",
    "Numer partii/serii": r"(\b\d{1,8}\b)",
    "Data ważności": r"(\b\d{2}/\d{2}/\d{4}\b)",
    "Email address": r"([\w\.\d]+\@[\w\d]+\.[\w\d]+)",
    # Pattern to match dates in the format "Month Year" (e.g. "January 2021")
    "Date type 4": r"\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\b \d{4}",
    # Pattern to match dates in the format "Month-Year" (e.g. "January-2021")
    "Date type 5": r"\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)-\d{4}",
    # Pattern to match dates in the format "Month/Year" (e.g. "January/2021")
    "Date type 6" : r"\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)/\d{4}",
    # Pattern to match dates in the format "MM.YYYY" (e.g. "01.2021")
    "Date type 7": r"\b(?:0[1-9]|1[0-2])\.[0-9]{4}\b",
    # Pattern to match dates in the format "MM.YYYY-MM.YYYY" (e.g. "01.2021-03.2023")
    "Date type 8": r"\b(?:0[1-9]|1[0-2])\.[0-9]{4}-(?:0[1-9]|1[0-2])\.[0-9]{4}\b",
    # Pattern to match dates in the format "MM.YYYY-MM.YYYY" (e.g. "01.2021-03.2023")
    "Date type 9": r"\b(?:0[1-9]|1[0-2])\.[0-9]{4}.*(?:0[1-9]|1[0-2])\.[0-9]{4}\b",
    "Data type 10": r"\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{4}",
    "Data type 11": r"\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s*-\s*\d{4}",
    "Data type 12": r"\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s*/\s*\d{4}",
    "Data type 13": r"\b(?:0[1-9]|1[0-2])\s*\.\s*[0-9]{4}\b",
    "Data type 14": r"\b(?:0[1-9]|1[0-2])\s*\.\s*[0-9]{4}\s*-\s*(?:0[1-9]|1[0-2])\s*\.\s*[0-9]{4}\b",
    # Pattern to match dates in the format "MM.YYYY" (e.g. "01.2021")
    "Date type 15": r"\b(?:0[1-9]|1[0-2])/[0-9]{4}\b",
    "Date type 16": r"\b\d{4}-\d{4}\b",
    "Date type 17": r"\b\d{4} - \d{4}\b",
    "Date type 19": r"\b\d{4} \s*-\s* \d{4}\b",
    "Date type 20": r"\b\d{4}/\d{4}\b",
    "Date type 21": r"\b\d{4} / \d{4}\b",
    "Date type 22": r"\b\d{4} \s*/\s* \d{4}\b",
    "Date type 23": r"\b\d{4}.\d{4}\b",
    "Date type 24": r"\b\d{4} . \d{4}\b",
    "Date type 25": r"\b\d{4} \s*.\s* \d{4}\b",
    "Date type 26": r"\b\d{4}\\\d{4}\b",
    "Date type 27": r"\b\d{4} \\ \d{4}\b",
    "Date type 28": r"\b\d{4} \s*\\\s* \d{4}\b",
    "Date type 29": r"\b\d{4}|\d{4}\b",
    "Date type 30": r"\b\d{4} | \d{4}\b",
    "Date type 31": r"\b\d{4} \s*|\s* \d{4}\b"
}