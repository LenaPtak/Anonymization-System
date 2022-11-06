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

