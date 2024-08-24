from models.database import SchemaMixin, db


class User(db.Model, SchemaMixin):
    id = db.Column(db.String(40), primary_key=True)
    chinese_name = db.Column(db.String(40), nullable=False, unique=False)
    state = db.Column(db.String(40), nullable=False, unique=False)

    # 0: admin, 1: studentA, 2: studentB, 3:building, 9:normal, 10:none
    authorization = db.Column(db.Integer, nullable=False, unique=False, default=9)
