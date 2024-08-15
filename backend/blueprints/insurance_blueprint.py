from datetime import datetime
from helpers.CustomResponse import CustomResponse

from models.insurance_model import Insurance, db
from flask import Blueprint, request
from sqlalchemy import desc

insurance_blueprint = Blueprint('insurance', __name__)


class InsuranceContainer:
    def __init__(self, json_request):
        if "application_date" not in json_request:
            raise "Application_Date is required."
        if "incident_date" not in json_request:
            raise "Incident_Date is required."
        if "name" not in json_request:
            raise "Name is required."
        if "student_id" not in json_request:
            raise "Student_ID is required."
        if "id_number" not in json_request:
            raise "ID_Number is required."
        if "address" not in json_request:
            raise "Address is required."
        if "phone_number" not in json_request:
            raise "Phone_Number is required."
        if "email" not in json_request:
            raise "Email is required."
        if "claim_details" not in json_request:
            raise "Claim_Details is required."
        if "payment_type" not in json_request:
            raise "Payment_Type is required."
        if "location" not in json_request:
            raise "Location is required."
        if "incident_cause" not in json_request:
            raise "Incident_Cause is required."
        if "receipt" not in json_request:
            raise "Receipt is required."
        if "diagnosis_certificate" not in json_request:
            raise "Diagnosis_Certificate is required."
        if "bankbook" not in json_request:
            raise "Bankbook is required."
        if "x_ray" not in json_request:
            raise "X_Ray is required."
        if "application_amount" not in json_request:
            raise "Application_Amount is required."
        if "claim_amount" not in json_request:
            raise "Claim_Amount is required."
        if "claim_date" not in json_request:
            raise "Claim_Date is required."
        if "remarks" not in json_request:
            raise "Remarks is required."
        if "insurance_company_stamp" not in json_request:
            raise "Insurance_Company_Stamp is required."

        self.data = {
            "application_date": datetime.fromisoformat(json_request["application_date"]),
            "incident_date": datetime.fromisoformat(json_request["incident_date"]),
            "name": json_request["name"],
            "student_id": json_request["student_id"],
            "id_number": json_request["id_number"],
            "address": json_request["address"],
            "phone_number": json_request["phone_number"],
            "email": json_request["email"],
            "claim_details": json_request["claim_details"],
            "payment_type": json_request["payment_type"],
            "location": json_request["location"],
            "incident_cause": json_request["incident_cause"],
            "receipt": json_request["receipt"],
            "diagnosis_certificate": json_request["diagnosis_certificate"],
            "bankbook": json_request["bankbook"],
            "x_ray": json_request["x_ray"],
            "application_amount": json_request["application_amount"],
            "claim_amount": json_request["claim_amount"],
            "claim_date": datetime.fromisoformat(json_request["claim_date"]),
            "remarks": json_request["remarks"],
            "insurance_company_stamp": json_request["insurance_company_stamp"]
        }

    def get_data(self):
        return self.data


@insurance_blueprint.route('<int:id_>', methods=['GET'])
def get_insurance(id_):
    """
    get insurances
    ---
    tags:
      - insurance
    parameters:
      - in: path
        name: id_
        type: integer
        required: true
        description: The insurance
    responses:
      200:
        description: get insurance success
        schema:
          id: Insurance
      404:
        description: insurance not found
        schema:
          id: NotFound
    """
    insurance = db.session.query(Insurance).get(id_)

    if insurance is None:
        return CustomResponse.not_found("Insurance not found", {})

    return CustomResponse.success("get insurance success", insurance.to_dict())


@insurance_blueprint.route('', methods=['GET'])
def get_insurances():
    """
    get insurances
    ---
    tags:
      - insurance
    parameters:
      - in: query
        name: page
        type: integer
        required: false
        description: The page
    responses:
      200:
        description: get insurances success
        schema:
          id: Insurance
    """
    page = int(request.args['page']) \
        if "page" in request.args and int(request.args['page']) > 1 \
        else 1

    insurances = db.session.query(Insurance)
    insurances = insurances.order_by(desc(Insurance.created_time)).all()
    insurances = [insurance.to_dict() for insurance in insurances][(page - 1) * 10:page * 10]

    return CustomResponse.success("get insurances success", insurances)


@insurance_blueprint.route('', methods=['POST'])
def post_insurance():
    """
    post insurance
    ---
    tags:
      - insurance
    parameters:
      - in: body
        name: body
        schema:
          id: InsuranceInput
    responses:
      201:
        description: post insurance success
        schema:
          id: Insurance
      422:
        description: unprocessable content
        schema:
          id: UnprocessableContent
    """
    try:
        request_payload = InsuranceContainer(request.json).get_data()
    except Exception as e:
        return CustomResponse.unprocessable_content(str(e), {})

    insurance = Insurance(**request_payload)
    db.session.add(insurance)
    db.session.commit()

    return CustomResponse.created("post insurance success", insurance.to_dict())


@insurance_blueprint.route('<int:id_>', methods=['PATCH'])
def patch_insurance(id_):
    """
    patch insurance
    ---
    tags:
      - insurance
    parameters:
      - in: path
        name: id_
        type: integer
        required: true
        description: The insurance
      - in: body
        name: body
        schema:
          id: Insurance
    responses:
      204:
        description: patch insurance success
        schema:
          id: Insurance
      404:
        description: insurance not found
        schema:
          id: NotFound
    """
    insurance = db.session.query(Insurance).get(id_)

    if insurance is None:
        return CustomResponse.not_found("Insurance not found", {})

    if "application_date" in request.json:
        insurance.application_date = datetime.fromisoformat(request.json["application_date"])
    if "incident_date" in request.json:
        insurance.incident_date = datetime.fromisoformat(request.json["incident_date"])
    if "name" in request.json:
        insurance.name = request.json["name"]
    if "student_id" in request.json:
        insurance.student_id = request.json["student_id"]
    if "id_number" in request.json:
        insurance.id_number = request.json["id_number"]
    if "address" in request.json:
        insurance.address = request.json["address"]
    if "phone_number" in request.json:
        insurance.phone_number = request.json["phone_number"]
    if "email" in request.json:
        insurance.email = request.json["email"]
    if "claim_details" in request.json:
        insurance.claim_details = request.json["claim_details"]
    if "payment_type" in request.json:
        insurance.payment_type = request.json["payment_type"]
    if "location" in request.json:
        insurance.location = request.json["location"]
    if "incident_cause" in request.json:
        insurance.incident_cause = request.json["incident_cause"]
    if "receipt" in request.json:
        insurance.receipt = request.json["receipt"]
    if "diagnosis_certificate" in request.json:
        insurance.diagnosis_certificate = request.json["diagnosis_certificate"]
    if "bankbook" in request.json:
        insurance.bankbook = request.json["bankbook"]
    if "x_ray" in request.json:
        insurance.x_ray = request.json["x_ray"]
    if "application_amount" in request.json:
        insurance.application_amount = request.json["application_amount"]
    if "claim_amount" in request.json:
        insurance.claim_amount = request.json["claim_amount"]
    if "claim_date" in request.json:
        insurance.claim_date = datetime.fromisoformat(request.json["claim_date"])
    if "remarks" in request.json:
        insurance.remarks = request.json["remarks"]
    if "insurance_company_stamp" in request.json:
        insurance.insurance_company_stamp = request.json["insurance_company_stamp"]

    db.session.commit()
    return CustomResponse.no_content("patch insurance success", insurance.to_dict())


@insurance_blueprint.route('<int:id_>', methods=['DELETE'])
def delete_insurance(id_):
    """
    delete insurance
    ---
    tags:
      - insurance
    responses:
      204:
        description: delete insurance success
        schema:
          id: Insurance
      404:
        description: insurance not found
        schema:
          id: NotFound
    """
    insurance = db.session.query(Insurance).get(id_)

    if insurance is None:
        return CustomResponse.not_found("Insurance not found", {})

    db.session.delete(insurance)
    db.session.commit()

    return CustomResponse.no_content("delete insurance success", {})