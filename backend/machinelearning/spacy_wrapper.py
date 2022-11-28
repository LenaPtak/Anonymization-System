import spacy

# TODO(Jan): Make machinelearning a module

# temporary until module is made - copy that for now to every wrapper
# to include the 'core' directory to pythonpath
from pathlib import Path
import sys
sys.path.insert(1, str(Path(__file__).parent / "core"))

# TODO(Jan): move that to top and remove flake suppresion
from core.wrapper import Wrapper  # noqa: E402

class SpacyWrapper(Wrapper):
    def __init__(self, weights_path= None):
        if weights_path is None:
            self.model = spacy.load('pl_core_news_sm')
        else:
            raise NotImplementedError
        
    def model(self, data):
        return self.model(data)

    def process_results(self, results, data):
        # tutaj ma zamazać tylko całe imiona i nazwiska z results.ents
        pass



if __name__ == "__main__":
    sp = SpacyWrapper()
    a = "Zdanie testowe Jana Kowalskiego"
    res = sp.model(a)
    print(res)
    sp.process_results(res, a)