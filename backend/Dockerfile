FROM python:3.10

WORKDIR /backend

RUN pip install --upgrade pip

COPY requirements.txt .

RUN pip install -r requirements.txt

RUN apt-get update
RUN apt-get install libgl1 ffmpeg libsm6 libxext6  -y

COPY . .

CMD ["uvicorn", "app:app", "--reload", "--host", "0.0.0.0"]
