import os
import cv2
import logging

from fastapi import HTTPException, status
from starlette.responses import FileResponse

from backend.machinelearning.yolo_wrapper import YoloWrapper
from backend.pydantics import UserFile
from backend.pdf import PDF, TXT
from backend.consts import (
    CONTENT_TYPE_TO_PATH_MAP,
    TXT_DIR_PATH,
    PDF_DIR_PATH,
    PNG_DIR_PATH,
    JPG_DIR_PATH,
    IMG_DIR_PATH,
)

async def process_file(file: UserFile) -> FileResponse:
    """
    Main file processing function
    """
    processed_type = file.type
    processed_name = "processed_" + file.unique_name
    processed_path = CONTENT_TYPE_TO_PATH_MAP[file.type] + processed_name

    if processed_type == "application/pdf":
        pdf = PDF(file.location)
        images = pdf.extract_images()
        if images[0]:
            yolo_wrapper = YoloWrapper()
            for i, image_dir in enumerate(images[0]):
                image = cv2.imread(image_dir)
                if image_dir[-4:] == '.png' or image_dir[-4:] == '.PNG':
                    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

                results = yolo_wrapper.model(image)
                image = yolo_wrapper.process_results(results, image)
                cv2.imwrite(image_dir, image)
                pdf.reintroduce_image(image_dir, images[1][i])
        pdf.hide_sensitive(processed_path)

    elif processed_type == "text/plain":
        txt = TXT(file.location)
        txt.hide_sensitive(processed_path)

    elif processed_type == "image/png":
        # TODO: Jan Bylicki task 10.10.2023
        pass

    elif processed_type == "image/jpeg":
        # TODO: Jan Bylicki task 10.10.2023
        pass

    else:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="Currently only pdf processing is possible.",
        )

    return FileResponse(
        path=processed_path,
        filename=processed_name,
        media_type=processed_type,
    )


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
    ]:
        files = os.listdir(context)
        for file in files:
            if files_to_delete and file not in files_to_delete:
                continue
            os.remove(context + file)
            logging.info(f"File: {file} have been deleted.")


def convert_bytes(num: float) -> str:
    """
    Coverts byte file size to human-readable string.
    """
    for x in ["bytes", "KB", "MB", "GB", "TB"]:
        if num < 1024.0:
            return "%3.1f %s" % (num, x)
        num /= 1024.0
