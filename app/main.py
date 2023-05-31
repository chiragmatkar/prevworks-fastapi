from fastapi import FastAPI, Depends, HTTPException
from .database import SessionLocal, engine 
from sqlalchemy.orm import Session
from .schema import  User
from . import crud, models 
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from pathlib import Path

models.Base.metadata.create_all(bind=engine)
app = FastAPI()

BASE_PATH = Path(__file__).resolve().parent
app.mount("/static", StaticFiles(directory=str(BASE_PATH / "static")), name="static")
templates = Jinja2Templates(directory=str(BASE_PATH / "templates"))

def db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

@app.get('/')
def index():
           #return templates.TemplateResponse("auth/register.html")
            return {"log":"homepage"}
        

@app.post('/register')
def register_user(info: User, db=Depends(db)):
    object_in_db = crud.register(db,info)
    return object_in_db



