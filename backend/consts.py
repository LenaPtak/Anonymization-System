TXT_DIR_PATH = "storage/txt/"
PNG_DIR_PATH = "storage/png/"
JPG_DIR_PATH = "storage/jpg/"
PDF_DIR_PATH = "storage/pdf/"
RAP_DIR_PATH = "storage/rap/"
IMG_DIR_PATH = "images/"

ALLOWED_FILE_TYPES = [
    "text/plain",
    "image/png",
    "image/jpeg",
    "application/pdf",
]
ALLOWED_FILE_RESULTS = [
    "default",
    "merge",
    "split",
]
CONTENT_TYPE_TO_PATH_MAP = {
    "text/plain": TXT_DIR_PATH,
    "image/png": PNG_DIR_PATH,
    "image/jpeg": JPG_DIR_PATH,
    "application/pdf": PDF_DIR_PATH,
}
CONTENT_TYPE_TO_EXTENSION_MAP = {
    "text/plain": ".txt",
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "application/pdf": ".pdf",
}

MINIMUM_MIDDLEWARE_SEC = 2