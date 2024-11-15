from copy import deepcopy
import random
import sys
from collections import defaultdict
import numpy as np
import cv2
import torch
from PIL import Image

# TODO(Jan): Make machinelearning a module
# temporary until module is made - copy that for now to every wrapper
# to include the 'core' directory to pythonpath
from pathlib import Path

sys.path.insert(1, str(Path(__file__).parent / "./core"))

# TODO(Jan): move that to top and remove flake suppresion
from core.wrapper import Wrapper  # noqa: E402

sys.path.insert(0, "./yolov3")


class YoloWrapper(Wrapper):
    def __init__(self, weights_path=None):
        self.color_dict = defaultdict(self.generate_color)

        if weights_path is None:
            self.model = torch.hub.load(
                'ultralytics/yolov3',
                'custom',
                str(Path(__file__).parent / 'yolov3.pt')
            )
        else:
            raise NotImplementedError

        self.show_image = None
        self.default_class_names = ["person"]
        self.class_names = self.model.names

        super().__init__(weights_path)

    def generate_color(self):
        return (
            random.randint(0, 255),
            random.randint(0, 255),
            random.randint(0, 255),
        )

    def model(self, data):
        return self.model.model(data)

    def process_results(self, results, data):
        blurred_img = deepcopy(data)
        blocks = 10
        (h, w) = data.shape[:2]
        xSteps = np.linspace(0, w, blocks + 1, dtype="int")
        ySteps = np.linspace(0, h, blocks + 1, dtype="int")
        for i in range(1, len(ySteps)):
            for j in range(1, len(xSteps)):
                startX = xSteps[j - 1]
                startY = ySteps[i - 1]
                endX = xSteps[j]
                endY = ySteps[i]
                roi = blurred_img[startY:endY, startX:endX]
                (B, G, R) = [int(x) for x in cv2.mean(roi)[:3]]
                cv2.rectangle(blurred_img, (startX, startY), (endX, endY),
                    (B, G, R), -1)
        # blurred_img = cv2.GaussianBlur(blurred_img, (501, 501), 0)
        out = data
        for i in results.xyxy[0]:
            x, y, w, h, conf, class_id = i
            x, y, w, h, conf, class_id = (
                int(x),
                int(y),
                int(w),
                int(h),
                float(conf),
                int(class_id),
            )
            if self.get_all_classes()[class_id] in self.get_classes() and conf > 0.5:
                mask = np.zeros(
                    (np.shape(data)[0], np.shape(data)[1], 3), dtype=np.uint8
                )
                mask = cv2.rectangle(mask, (x, y), (x + w, y + h), (255, 255, 255), -1)
                out = np.where(mask == np.array([255, 255, 255]), blurred_img, out)
            
        if self.show_image:
            im_pil = Image.fromarray(out)
            im_pil.show()
        return out

    def get_all_classes(self):
        return self.class_names

    def get_classes(self):
        return self.default_class_names

    def set_classes(self, param):
        self.default_class_names = param


if __name__ == "__main__":
    import os

    yw = YoloWrapper()
    yw.show_image = True

    image = cv2.imread(os.getenv("HOME") + "/asdf.jpg")
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    results = yw.model(image)
    image = yw.process_results(results, image)
