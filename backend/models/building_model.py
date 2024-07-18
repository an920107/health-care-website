from werkzeug.exceptions import BadRequest

from models.database import SchemaMixin, db
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.ext.mutable import MutableList


class Post(SchemaMixin, db.Model):
    __tablename__ = 'post'

    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)

    title_en = db.Column(db.String(255), nullable=False)
    content_en = db.Column(db.Text, nullable=False)

    column = db.Column(db.String(255), nullable=False)
    attachments = db.Column(MutableList.as_mutable(JSON), nullable=False, default=[])
    importance = db.Column(db.Boolean, default=False)
    visibility = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<Carousel {self.title}>'


