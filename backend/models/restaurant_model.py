from datetime import datetime

from models.database import SchemaMixin, db
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.ext.mutable import MutableList


class Restaurant(SchemaMixin, db.Model):
    __tablename__ = 'restaurant'

    title = db.Column(db.String(255), nullable=False)
    title_en = db.Column(db.String(255), nullable=False)
    category = db.Column(db.Text, nullable=False)
    item = db.Column(db.String(255), nullable=False)
    item_en = db.Column(db.String(255), nullable=False)
    attachments = db.Column(MutableList.as_mutable(JSON), nullable=False, default=[])
    valid = db.Column(db.Boolean, default=False)
    visibility = db.Column(db.Boolean, default=False)
    inspected_time = db.Column(db.DateTime, default=False)
    viewer = db.Column(db.Integer, default=0)

    def __repr__(self):
        return f'<Restaurant {self.title}>'

    def to_dict(self):
        return {
            'title': self.title,
            'title_en': self.title_en,
            'category': self.category,
            'item': self.item,
            'item_en': self.item_en,
            'attachments': self.attachments,
            'valid': self.valid,
            'visibility': self.visibility,
            'inspected_time': datetime.isoformat(self.inspected_time),
            'viewer': self.viewer,
            'updated_time': self.updated_time,
            'created_time': self.created_time
        }
