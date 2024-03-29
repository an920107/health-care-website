from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class SchemaMixin:
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    create_time = db.Column(db.DateTime, nullable=False, default=datetime.now)
    update_time = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)

    def as_dict(self):
        return {
            c.name: getattr(self, c.name).isoformat()
            if isinstance(getattr(self, c.name), datetime)
            else str(getattr(self, c.name))
            for c in self.__table__.columns
        }


class Post(db.Model, SchemaMixin):
    title = db.Column(db.String(40), nullable=False)
    content = db.Column(db.Text, nullable=False)
    column = db.Column(db.String(10), nullable=False)
    attachments = db.Column(db.String(100), nullable=False)
    visible = db.Column(db.String(1), nullable=False, default='0')
    importance = db.Column(db.String(1), nullable=False, default='0')


class File(db.Model, SchemaMixin):
    name = db.Column(db.String(40), nullable=False)
    file_path = db.Column(db.String(100), nullable=False, unique=True)


class User(db.Model, SchemaMixin):
    id = db.Column(db.Integer, primary_key=True)
    chinese_name = db.Column(db.String(40), nullable=False, unique=False)
    authorization = db.Column(db.Integer, nullable=False, unique=False, default=-1)


class OauthTmpInfo(db.Model, SchemaMixin):
    state = db.Column(db.String(100), nullable=False, unique=False)
    access_token = db.Column(db.String(40), nullable=False, unique=False)


class Carousel(db.Model, SchemaMixin):
    id = db.Column(db.String(40), primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    file_path = db.Column(db.String(100), nullable=False, unique=True)
