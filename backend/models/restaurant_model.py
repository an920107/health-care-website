from werkzeug.exceptions import BadRequest

from models.database import SchemaMixin, db
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.ext.mutable import MutableList


class Restaurant(SchemaMixin, db.Model):
    __tablename__ = 'restaurant'

    title = db.Column(db.String(255), nullable=False)
    category = db.Column(db.Text, nullable=False)
    item = db.Column(db.String(255), nullable=False)
    attachments = db.Column(MutableList.as_mutable(JSON), nullable=False, default=[])
    valid = db.Column(db.Boolean, default=False)
    visibility = db.Column(db.Boolean, default=False)
    inspected_time = db.Column(db.DateTime, default=False)

    def __repr__(self):
        return f'<Restaurant {self.title}>'


