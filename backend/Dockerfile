FROM docker.io/library/python:3.10 AS install-base

RUN apt-get update -y

RUN pip install --upgrade pip
RUN pip install gunicorn

FROM install-base AS install-requirements

WORKDIR /app
COPY './requirements.txt' .
RUN pip --timeout=1000 install -r requirements.txt

FROM install-requirements AS release

WORKDIR /app
COPY . .

CMD ["gunicorn" , "-b", "0.0.0.0:5001", "-w", "41", "app:app"]
EXPOSE 5001