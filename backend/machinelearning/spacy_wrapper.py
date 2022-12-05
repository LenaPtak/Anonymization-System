import re
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
        
        super().__init__(weights_path)
        
    def model(self, data):
        return self.model(data)

    def process_results(self, results, data):
        # tutaj ma zamazać tylko całe imiona i nazwiska z results.ents
        
        name_pattern = re.compile(r"[A-Z][a-z]+\s+[A-Z][a-z]+")
        replaced_data = data

        for result in results:
            if result.label_ == 'persName' and name_pattern.fullmatch(result.text) is not None:
                replacemnt = 'X' * len(result.text)
                replaced_data = replaced_data.replace(result.text, replacemnt)
        
        return replaced_data



if __name__ == "__main__":
    sp = SpacyWrapper()
    a = "Jan Bylicki zrobil fajny opis jak dziala NLP na jego Linuksie i to calkiem niezle smiga i wyslal do Pani Anastasii Trubchaninovej i Tomasza P. na ares tomaszp1234@gmail.com wraz z numerem AL47 2121 1009 0000 0002 3569 87411"
    res = sp.model(a)
    result = sp.process_results(res.ents, a)
    print(result)