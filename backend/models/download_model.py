from models.database import SchemaMixin, db


class Download(SchemaMixin, db.Model):
    __tablename__ = 'download'

    title = db.Column(db.String(255), nullable=False)
    title_en = db.Column(db.String(255), nullable=False)
    column = db.Column(db.String(255), nullable=False)
    visibility = db.Column(db.Boolean, nullable=False, default=False)
    filepath = db.Column(db.String(255), nullable=False)
    viewer = db.Column(db.Integer, nullable=False, default=0)

    def __repr__(self):
        return f'<Carousel {self.filename}>'
