from werkzeug.exceptions import BadRequest

from models.database import SchemaMixin, db
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.ext.mutable import MutableList


class Insurance(SchemaMixin, db.Model):
    __tablename__ = 'insurance'

    application_date = db.Column(db.DateTime)
    incident_date = db.Column(db.DateTime)
    name = db.Column(db.String(40))
    student_id = db.Column(db.String(40))
    id_number = db.Column(db.String(40))
    address = db.Column(db.String(60))
    phone_number = db.Column(db.String(40))
    email = db.Column(db.String(120))
    claim_details = db.Column(db.String(40))
    payment_type = db.Column(db.String(40))
    location = db.Column(db.String(40))
    incident_cause = db.Column(db.TEXT)
    receipt = db.Column(db.TEXT)
    diagnosis_certificate = db.Column(db.TEXT)
    bankbook = db.Column(db.Integer)
    x_ray = db.Column(db.Integer)
    application_amount = db.Column(db.Integer)
    claim_amount = db.Column(db.Integer)
    claim_date = db.Column(db.DateTime)
    remarks = db.Column(db.TEXT)
    insurance_company_stamp = db.Column(db.Boolean)
    insurance_company_timestamp = db.Column(db.DateTime)

    def __repr__(self):
        return f'<Insurance {self.name}>'

