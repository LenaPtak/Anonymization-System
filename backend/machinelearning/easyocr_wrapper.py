import easyocr
from typing import List
import cv2
import numpy as np
from PIL import Image

# TODO(Jan): Make machinelearning a module

# temporary until module is made - copy that for now to every wrapper
# to include the 'core' directory to pythonpath
from pathlib import Path
import sys
sys.path.insert(1, str(Path(__file__).parent / "core"))

# TODO(Jan): move that to top and remove flake suppresion
from core.wrapper import Wrapper  # noqa: E402


class EasyOCRWrapper(Wrapper):
    def __init__(
            self,
            weights_path,
            languages: List = ['pl', 'en'],
            detail=0):
        self.ocr_model = easyocr.Reader(languages)
        self.detail = 0
        self.show_image = False
        super().__init__(weights_path)

    def set_detail(self, det):
        self.detail = det

    def get_detail(self):
        return self.detail

    def model(self, data):
        return self.ocr_model.readtext(data)

    def preprocess_results(self, results, data):
        texts = []
        for box, text, p in results:
            if p > 0.75:
                top_l, top_r, bot_r, bot_l = box
                texts.append(text)
                print("[INFO] {:.4f}: {}".format(p, text))
                top_l = (int(top_l[0]), int(top_l[1]))
                top_r = (int(top_r[0]), int(top_r[1]))
                bot_r = (int(bot_r[0]), int(bot_r[1]))
                bot_l = (int(bot_l[0]), int(bot_l[1]))
                text = "".join([c if ord(c) < 128 else "" for c in text]).strip()
                cv2.rectangle(image, top_l, bot_r, (0, 255, 0), 2)
                cv2.putText(
                    image,
                    text,
                    (top_l[0], top_l[1] - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2
                )
        if self.show_image:
            im_pil = Image.fromarray(image)
            im_pil.show()
        return texts


if __name__ == "__main__":
    import os
    eo = EasyOCRWrapper(None)

    image = cv2.imread(str(Path(__file__).parent / "./ocr_torture_test.png"))
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = eo.model(image)
    eo.show_image = True
    eo.preprocess_results(results, image)
    # image = eo.process_results(results, image)
