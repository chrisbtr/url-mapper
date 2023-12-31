FROM python:latest

WORKDIR /app

ADD ./config /app

ADD ./requirements.txt /app

RUN pip install --trusted-host pypi.python.org -r requirements.txt

RUN python manage.py makemigrations
RUN python manage.py migrate

EXPOSE 8000

CMD ["python", "-u", "manage.py", "runserver", "0.0.0.0:8000"]