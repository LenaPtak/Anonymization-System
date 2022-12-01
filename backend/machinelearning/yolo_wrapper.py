import random
import sys
from collections import defaultdict

# temporary until module is made - copy that for now to every wrapper
# to include the 'core' directory to pythonpath
from pathlib import Path

import cv2
import torch
from PIL import Image

# TODO(Jan): Make machinelearning a module

sys.path.insert(1, str(Path(__file__).parent / "core"))

# TODO(Jan): move that to top and remove flake suppresion
from core.wrapper import Wrapper  # noqa: E402


class YoloWrapper(Wrapper):
    def __init__(self, weights_path=None):
        self.color_dict = defaultdict(self.generate_color)

        if weights_path is None:
            self.model = torch.hub.load("ultralytics/yolov3", "yolov3")
        else:
            raise NotImplementedError

        self.show_image = None

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
            cv2.rectangle(image, (x, y), (w, h), self.color_dict[class_id], 2)
            data = cv2.putText(
                image,
                "conf: {:.2f}".format(conf),
                (x + 5, y - 5),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.7,
                self.color_dict[class_id],
                2,
            )
            data = cv2.putText(
                image,
                self.model.names[class_id],
                (x + 5, h - 5),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.7,
                self.color_dict[class_id],
                2,
            )
        if self.show_image:
            im_pil = Image.fromarray(data)
            im_pil.show()
        return image


if __name__ == "__main__":
    import os

    yw = YoloWrapper()
    yw.show_image = True

    image = cv2.imread(os.getenv("HOME") + "/img.jpg")
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    results = yw.model(image)
    image = yw.process_results(results, image)
