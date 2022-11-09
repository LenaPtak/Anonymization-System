import torch
from PIL import Image
import cv2
from collections import defaultdict
import random


class YoloWrapper:
    def __init__(self, weights_path=None):
        self.color_dict = defaultdict(self.generate_color)
        if weights_path is None:
            self.model = torch.hub.load('ultralytics/yolov3', 'yolov3')
        else:
            raise NotImplementedError

    def generate_color(self):
        return (
            random.randint(0, 255),
            random.randint(0, 255),
            random.randint(0, 255)
        )

    def model(self, image):
        return self.model.model(image)

    def render_results(self, results, image, show_image=False):
        for i in results.xyxy[0]:
            x, y, w, h, conf, class_id = i
            x, y, w, h, conf, class_id = int(x), \
                int(y), \
                int(w), \
                int(h), \
                float(conf), \
                int(class_id)
            cv2.rectangle(image, (x, y), (w, h), self.color_dict[class_id], 2)
            image = cv2.putText(
                image,
                "conf: {:.2f}".format(conf),
                (x+5, y-5),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.7,
                self.color_dict[class_id],
                2
            )
            image = cv2.putText(
                image,
                self.model.names[class_id],
                (x+5, h-5),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.7,
                self.color_dict[class_id],
                2
            )
        if show_image:
            im_pil = Image.fromarray(image)
            im_pil.show()
        return image


if __name__ == "__main__":
    import os
    yw = YoloWrapper()
    image = cv2.imread(os.getenv("HOME")+'/img.jpg')
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = yw.model(image)
    image = yw.render_results(results, image, True)
