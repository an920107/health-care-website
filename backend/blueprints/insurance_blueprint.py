import io
import pandas as pd
from datetime import datetime

from helpers.CustomResponse import CustomResponse

from sqlalchemy import or_
from helpers.auth_helpers import authorization_required
from models.insurance_model import Insurance, db
from flask import Blueprint, request, send_file
from sqlalchemy import desc
import math


insurance_blueprint = Blueprint('insurance', __name__)


class InsuranceContainer:
    def __init__(self, json_request):
        if "application_date" not in json_request:
            raise ValueError("Application_Date is required.")
        if "incident_date" not in json_request:
            raise ValueError("Incident_Date is required.")
        if "name" not in json_request:
            raise ValueError("Name is required.")
        if "student_id" not in json_request:
            raise ValueError("Student_ID is required.")
        if "id_number" not in json_request:
            raise ValueError("ID_Number is required.")
        if "address" not in json_request:
            raise ValueError("Address is required.")
        if "phone_number" not in json_request:
            raise ValueError("Phone_Number is required.")
        if "email" not in json_request:
            raise ValueError("Email is required.")
        if "claim_details" not in json_request:
            raise ValueError("Claim_Details is required.")
        if "payment_type" not in json_request:
            raise ValueError("Payment_Type is required.")
        if "location" not in json_request:
            raise ValueError("Location is required.")
        if "incident_cause" not in json_request:
            raise ValueError("Incident_Cause is required.")
        if "receipt" not in json_request:
            raise ValueError("Receipt is required.")
        if "diagnosis_certificate" not in json_request:
            raise ValueError("Diagnosis_Certificate is required.")
        if "bankbook" not in json_request:
            raise ValueError("Bankbook is required.")
        if "x_ray" not in json_request:
            raise ValueError("X_Ray is required.")
        if "application_amount" not in json_request:
            raise ValueError("Application_Amount is required.")
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
            "claim_amount": json_request.get("claim_amount", None),
            "remarks": json_request.get("remarks", None),
            "insurance_company_stamp": json_request.get("insurance_company_stamp", None),
        }
        if "claim_date" in json_request:
            self.data["claim_date"] = datetime.fromisoformat(json_request["claim_date"])

        if "insurance_company_timestamp" in json_request:
            self.data["insurance_company_timestamp"] = datetime.fromisoformat(
                json_request["insurance_company_timestamp"])

    def get_data(self):
        return self.data


@insurance_blueprint.route('<int:id_>', methods=['GET'])
@authorization_required([0, 1])
def get_insurance(id_):
    """
    get insurance
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


@insurance_blueprint.route('',  methods=['GET'])
@authorization_required([0, 1])
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
      - in: query
        name: search
        type: string
        required: false
    responses:
      200:
        description: get insurances success
        schema:
          id: InsuranceQuery
    """
    page = int(request.args['page']) \
        if "page" in request.args and int(request.args['page']) > 1 \
        else 1

    insurances = db.session.query(Insurance)

    if "search" in request.args:
        insurances = insurances.filter(or_(*[Insurance.student_id.like(f'%{term}%') for term in request.args['search'].split('+')]))

    insurances = insurances.order_by(desc(Insurance.created_time)).all()
    total_page = math.ceil(len(insurances) / 10)
    insurances = [insurance.to_dict() for insurance in insurances][(page - 1) * 10:page * 10]

    return {'message': 'get insurances success', 'data': insurances, 'total_page': total_page}, 200


@insurance_blueprint.route('', methods=['POST'])
@authorization_required([0, 1])
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
@authorization_required([0, 1])
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
    if "insurance_company_timestamp" in request.json:
        insurance.insurance_company_timestamp = datetime.fromisoformat(request.json["insurance_company_timestamp"])

    db.session.commit()
    return CustomResponse.no_content("patch insurance success", insurance.to_dict())


@insurance_blueprint.route('<int:id_>', methods=['DELETE'])
@authorization_required([0, 1])
def delete_insurance(id_):
    """
    delete insurance
    ---
    tags:
      - insurance
    parameter:
      - in: path
        name: id_
        type: integer
        required: true
        description: The insurance
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


@insurance_blueprint.route('report', methods=['GET'])
@authorization_required([0, 1])
def get_insurance_report():
    """
    get insurance report
    ---
    tags:
      - insurance
    parameters:
      - in: query
        name: from
        type: string
        required: true
        example: "2021-01-01"
        description: The start time
      - in: query
        name: to
        type: string
        required: true
        example: "2024-01-01"
        description: The end time
    responses:
      200:
        description: get dengue report success
    """

    chinese_title_mapping = {
        "application_date": "申請日期",
        "incident_date": "事故日期",
        "name": "姓名",
        "student_id": "學號",
        "id_number": "身份證字號",
        "address": "地址",
        "phone_number": "電話",
        "email": "email",
        "claim_details": "理賠內容",
        "payment_type": "給付類別",
        "location": "地點",
        "incident_cause": "事故原因（簡述）",
        "receipt": "收據（醫院名稱 + 份數）",
        "diagnosis_certificate": "診斷書（醫院名稱 + 份數）",
        "bankbook": "存摺",
        "x_ray": "X 光",
        "application_amount": "申請金額",
        "claim_amount": "理賠金額",
        "claim_date": "理賠日期",
        "remarks": "備註",
        "insurance_company_stamp": "保險公司收件核章",
        "insurance_company_timestamp": "核章日期"
    }

    from_date = datetime.fromisoformat(request.args['from'])
    to_date = datetime.fromisoformat(request.args['to'])

    insurances = db.session.query(Insurance) \
        .filter(Insurance.application_date >= from_date) \
        .filter(Insurance.application_date <= to_date).all()

    insurances_df = None
    if len(insurances) == 0:
        insurances_df = pd.DataFrame([], columns=chinese_title_mapping.values())
    else:
        insurances_df = pd.DataFrame([insurance.to_dict() for insurance in insurances])
        insurances_df = pd.concat([insurances_df[['id']], insurances_df[chinese_title_mapping.keys()]], axis=1)
        insurances_df.columns = ['id'] + list(chinese_title_mapping.values())

        insurances_df['申請日期'] = insurances_df['申請日期'].dt.strftime('%Y-%m-%d')
        insurances_df['事故日期'] = insurances_df['事故日期'].dt.strftime('%Y-%m-%d')
        insurances_df['理賠日期'] = insurances_df['理賠日期'].apply(lambda x: x.strftime('%Y-%m-%d') if x else None)
        insurances_df['核章日期'] = insurances_df['核章日期'].apply(lambda x: x.strftime('%Y-%m-%d') if x else None)

    output = io.BytesIO()
    with pd.ExcelWriter(output, engine='openpyxl') as writer:
        insurances_df.to_excel(writer, sheet_name="保險紀錄", index=False)

    output.seek(0)
    return send_file(
        output,
        as_attachment=True,
        download_name='保險紀錄表.xlsx'
    )
