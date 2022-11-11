class Wrapper:
    def __init__(self, weights_path):
        self.model_path = weights_path

    def model(self, data):
        raise NotImplementedError

    def process_results(self, results, data):
        raise NotImplementedError
