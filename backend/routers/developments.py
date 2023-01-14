import os
import cv2
from time import time
from fastapi import APIRouter

from backend.machinelearning.easyocr_wrapper import EasyOCRWrapper
from backend.machinelearning.yolo_wrapper import YoloWrapper
from backend.consts import CONTENT_TYPE_TO_PATH_MAP
from backend.pdf import PDF

router = APIRouter(prefix="/api", tags=["Development"])


@router.get("/temporary")
async def process_test_file():

    processed_type = "application/pdf"
    processed_name = "processed_" + "cv_1.pdf"
    processed_path = (CONTENT_TYPE_TO_PATH_MAP["application/pdf"] + processed_name)

    start = time()

    if processed_type == "application/pdf":
        pdf = PDF("./examples/cv_1.pdf")
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
                eo = EasyOCRWrapper(None)

                results = eo.model(image)
                # text: list(str)
                # boxes: list((top_left, top_right, bottom_left, bottom_right))
                # every coordinate is another tuple of (x,y) coordinates
                # so the shape of boxes combined is list(tuple_4(tuple_2))
                texts, boxes = eo.preprocess_results(results, image)
                # for text, box in zip(texts, boxes):
                    # print("INFO (EasyOCR):", texts)
                # phrases_to_anonymize powinien zawierać te frazy które w znalezionych
                # stringach trzeba usunąć, wstawiam placeholder value
                # żeby nie crashowało, zastąp to callem do anonimizowania stringów
                phrases_to_anonymize = "To usuń"
                final_anonymized_image = eo.anonymize_strings(
                        image,
                        results,
                        phrases_to_anonymize
                )

                pdf.hide_sensitive(processed_path)
                pdf_processed = PDF(processed_path)
                pdf_processed.reintroduce_image(image_dir, images[1][i])

        else:
            pdf.hide_sensitive(processed_path)

    end = time()
    print(f"PROCESSING TIME: {round(end - start, 2)}")
    file_size_before = os.path.getsize("./examples/cv_1.pdf")
    file_size_after = os.path.getsize(processed_path)
    print(f"FILE SIZE INCREASE: {round(file_size_after / file_size_before, 2) * 100}%")
