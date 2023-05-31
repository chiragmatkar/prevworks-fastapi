from sqlalchemy.orm import Session
from . import schema, models


def register(db: Session, info: schema.User):
    userinfo = models.User(**info.dict())
    db.add(userinfo)
    db.commit()
    db.refresh(userinfo)
    return userinfo
