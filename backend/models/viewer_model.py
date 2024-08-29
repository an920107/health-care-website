from models.database import SchemaMixin, db


class Viewer(SchemaMixin, db.Model):
    __tablename__ = 'viewer'

    viewer = db.Column(db.Integer, nullable=False, default=0)

    def __repr__(self):
        return f'<Viewer {self.viewer}>'