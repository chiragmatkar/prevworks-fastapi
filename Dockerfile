FROM python:3.11
COPY ./app ./app
COPY requirements.txt requirements.txt
COPY ./app/static ./app/static
COPY ./app/templates ./app/templates
RUN pip install -r requirements.txt
#CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]