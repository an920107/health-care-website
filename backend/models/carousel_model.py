from models.database import SchemaMixin, db


class Carousel(SchemaMixin, db.Model):
    __tablename__ = 'carousel'

    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.String(255), nullable=False)
    visibility = db.Column(db.Boolean, nullable=False, default=False)
    filepath = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f'<Carousel {self.filename}>'