from models.database import SchemaMixin, db


class Attachment(SchemaMixin, db.Model):
    __tablename__ = 'attachment'

    filename = db.Column(db.String(255), nullable=False)
    filepath = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f'<Attachment {self.filename}>'
