from pydantic import BaseModel 
from typing import Optional 


class User(BaseModel):
    email: str
    first_name: str
    last_name: str
    password: str


    class Config:
        orm_mode = True