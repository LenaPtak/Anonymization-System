# Backend setup

Przede wszystkim musimy upewnić się ze mamy virtualenv'a.
Polecam **pyenv**: https://github.com/pyenv/pyenv

>Po zainstalowaniu **pyenv** otwieramy terminal ***w folderze Anonimization-System/***
>```PYTHON
>pyenv install 3.10.0
>pyenv virtualenv 3.10.0 anonymization-system-venv
>pyenv local anonymization-system-venv
>```

>Następnie w przypadku VSCode wybieramy domyślnie otwierany interpreter, który przed chwilą stworzyliśmy
>```
>Ctrl + shift + p -> Python: Select Interpreter
>```

>Instalujemy Flaska i inne zaleności
>```PYTHON
>pip install Flask
>    lub (w przyszłości)
>pip install -r requirements.txt
>```

>Ustawiamy zmienne środowiskowe.
>Otwieramy terminal ***w folderze Anonimization-System/***
>
> Linux/MacOS:
> ```BASH
> $ export FLASK_APP=flaskr
> $ export FLASK_ENV=development
> $ flask run
> ```
> Windows:
> ```POWERSHELL
> > $env:FLASK_APP = "flaskr"
> > $env:FLASK_ENV = "development"
> > flask run
> ```

