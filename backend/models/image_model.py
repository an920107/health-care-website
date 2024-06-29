from models.database import SchemaMixin, db


class Image(SchemaMixin, db.Model):
    __tablename__ = 'image'

    filename = db.Column(db.String(255), nullable=False)
    filepath = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f'<Attachment {self.filename}>'
