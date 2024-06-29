from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class SchemaMixin:
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    created_time = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_time = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)

    def to_dict(self):
        dict_representation = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        dict_representation['updated_time'] = dict_representation['updated_time'].strftime('%Y-%m-%dT%H:%M:%S')
        dict_representation['created_time'] = dict_representation['created_time'].strftime('%Y-%m-%dT%H:%M:%S')
        return dict_representation
