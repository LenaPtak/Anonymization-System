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

>Instalujemy zależności
>```PYTHON
>pip install -r requirements.txt
>```
