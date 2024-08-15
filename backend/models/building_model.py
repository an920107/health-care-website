from werkzeug.exceptions import BadRequest

from models.database import SchemaMixin, db
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.ext.mutable import MutableList


class Building(SchemaMixin, db.Model):
    __tablename__ = 'building'

    name = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, nullable=True)
    importance = db.Column(db.Boolean, default=False)
    visibility = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<Building {self.name}>'
