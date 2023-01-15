from copy import deepcopy
import easyocr
from typing import List
import cv2
from PIL import Image
import numpy as np

from craft_text_detector import (
    load_craftnet_model,
    load_refinenet_model,
    get_prediction,
)
import craft_text_detector.file_utils as file_utils

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
        self.refine_net = load_refinenet_model(cuda=False)
        self.craft_net = load_craftnet_model(cuda=False)

        super().__init__(weights_path)

    def set_detail(self, det):
        self.detail = det

    def get_detail(self):
        return self.detail

    def model(self, data):
        prediction_result = get_prediction(
            image=data,
            craft_net=self.craft_net,
            refine_net=self.refine_net,
            text_threshold=0.7,
            link_threshold=0.4,
            low_text=0.4,
            cuda=False,
            long_size=1280
        )
        texts = []
        for poly, box_as_ratio, box in zip(prediction_result['polys'], prediction_result['boxes_as_ratios'], prediction_result['boxes']):
            best_text, best_text_len, r_poly = "", 0, None
            img = file_utils.rectify_poly(data, poly)
            for i in range(4):
                candidate = self.ocr_model.readtext(img)
                img = cv2.rotate(img, cv2.ROTATE_90_CLOCKWISE)
                if candidate:
                    leng = sum([len(a[1]) for a in candidate if a[2] > 0.25])
                    if leng > best_text_len:
                        best_text = candidate
                        best_text_len = leng
                        r_poly = deepcopy(box)
                box = [[j, -i] for i, j in box]
            img = cv2.rotate(img, cv2.ROTATE_90_COUNTERCLOCKWISE)
            box = [[-j, i] for i, j in box]
            for i, elem in enumerate(best_text):
                best_text[i] = (list(np.array(r_poly).astype('int')), best_text[i][1], best_text[i][2])
            print(best_text)
            texts.append((best_text, img))
        return texts

    def preprocess_results(self, results, image):
        texts = []
        boxes = []
        for i, img in results:
            for box, text, p in i:
                if p > 0.25:
                    top_l, top_r, bot_r, bot_l = box
                    top_l = (int(top_l[0]), int(top_l[1]))
                    top_r = (int(top_r[0]), int(top_r[1]))
                    bot_r = (int(bot_r[0]), int(bot_r[1]))
                    bot_l = (int(bot_l[0]), int(bot_l[1]))
                    text = "".join([c if ord(c) < 128 else "" for c in text]).strip()
                    texts.append(text)
                    boxes.append((top_l, top_r, bot_l, bot_r))
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
        return texts, boxes

    def anonymize_strings(self, image, data, phrases):
        # words = self.ocr_model.readtext(data[0][1], paragraph=False, detail=0, width_ths=0.03)
        # TODO(Jan): Anonymize phrases given by backend
        return image
        

if __name__ == "__main__":
    eo = EasyOCRWrapper(None)

    image = cv2.imread(str(Path(__file__).parent / "./ocr_test_2.png"))
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = eo.model(image)
    eo.show_image = True
    eo.preprocess_results(results, image)
    # image = eo.process_results(results, image)
