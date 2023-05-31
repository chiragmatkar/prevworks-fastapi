from .database import Base
from sqlalchemy import Column, String, Boolean, Integer


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key = True, autoincrement = True)
    email = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    password = Column(String)