import easyocr
from typing import List
import cv2

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
        super().__init__(weights_path)

    def set_detail(self, det):
        self.detail = det

    def get_detail(self):
        return self.detail

    def model(self, data):
        return self.ocr_model.readtext(data)


if __name__ == "__main__":
    import os
    eo = EasyOCRWrapper(None)

    image = cv2.imread(os.getenv("HOME")+'/img.png')
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = eo.model(image)
    for i in results:
        print(i)
    # image = eo.process_results(results, image)
