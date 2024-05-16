import os
import uuid
from config import Config
from pathlib import Path

from script.utils import api_input_check, api_input_get
from script.oauth_scripts import authorization_required

from models.models import Insurance, db
from models.responses import Response

from flask import Blueprint, request

insurance_blueprint = Blueprint('insurance', __name__)

@insurance_blueprint.route('/<int:insurance_id>', methods=['GET'])
def get_insurance(insurance_id):
    """
    get insurance by insurance_id
    ---
    tags:
      - insurance
    parameters:
      - in: path
        name: insurance_id
        required: true
        schema:
        type: integer
    responses:
      200:
        description: get insurance successful
      404:
        description: insurance not found
    """
    insurance = Insurance.query.get(insurance_id)
    return Response.response('get insurance successful', insurance.as_dict())


@insurance_blueprint.route('', methods=['GET'])
def get_insurances():
    """
    get insurances
    ---
    tags:
      - insurance
    responses:
      200:
        description: get insurances successful
    """
    insurances = Insurance.query.all()
    total_page = len(insurances) // Config.PAGE_SIZE + 1
    if request.args.get('page') and int(request.args['page']) >= 1:
        page = int(request.args['page'])
    else:
        page = 1
    insurances = insurances[(page - 1) * Config.PAGE_SIZE:page * Config.PAGE_SIZE]
    payload = {
        'total_page': str(total_page),
        'insurances': [insurance.as_dict() for insurance in insurances],
        'page': str(page)
    }
    return Response.response('get insurances successful', payload)


@insurance_blueprint.route('', methods=['POST'])
@authorization_required(1)
def upload_insurance():
    """
    upload insurance
    ---
    tags:
      - insurance
    parameters:
      - in: formData
        name: name
        required: true
        schema:
        type: string
      - in: formData
        name: student_number
        required: true
        schema:
        type: string
      - in: formData
        name: email
        required: true
        schema:
        type: string
      - in: formData
        name: address
        required: true
        schema:
        type: string
      - in: formData
        name: phone
        required: true
        schema:
        type: string
      - in: formData
        name: identity_number
        required: true
        schema:
        type: string
      - in: formData
        name: accident_reason
        required: true
        schema:
        type: string
      - in: formData
        name: accident_type
        required: true
        schema:
        type: string
      - in: formData
        name: accident_date
        required: true
        schema:
        type: string
      - in: formData
        name: accident_location
        required: true
        schema:
        type: string
      - in: formData
        name: claim_type
        required: true
        schema:
        type: string
      - in: formData
        name: apply_amount
        required: true
        schema:
        type: integer
      - in: formData
        name: claim_amount
        required: true
        schema:
        type: integer
      - in: formData
        name: receipt
        required: true
        schema:
        type: string
      - in: formData
        name: certificate
        required: true
        schema:
        type: string
      - in: formData
        name: deposit_book
        required: true
        schema:
        type: boolean
      - in: formData
        name: x_ray
        required: true
        schema:
        type: boolean
      - in: formData
        name: sign
        required: true
        schema:
        type: string
      - in: formData
        name: claim_date
        required: true
        schema:
        type: string
      - in: formData
        name: application_scan_id
        required: true
        schema:
        type: string
      - in: formData
        name: note
        required: true
        schema:
        type: string
    responses:
      200:
        description: upload post successful
      400:
        description: no ['name', 'student_number', 'email', 'address', 'phone', 'identity_number', 'accident_reason', 'accident_type', 'accident_date', 'accident_location', 'claim_type', 'apply_amount', 'claim_amount', 'receipt', 'certificate', 'deposit_book', 'x_ray', 'sign', 'claim_date', 'application_scan_id', 'note'] or content in form
    """
    if not api_input_check([
        'name', 'student_number', 'email', 'address', 'phone', 'identity_number', 'accident_reason', 'accident_type',
        'accident_date', 'accident_location', 'claim_type', 'apply_amount', 'claim_amount', 'receipt', 'certificate',
        'deposit_book', 'x_ray', 'sign', 'claim_date', 'application_scan_id', 'note'
    ], request.form):
        Response.client_error(
            "no ['name', 'student_number', 'email', 'address', 'phone', 'identity_number', 'accident_reason', 'accident_type', 'accident_date', 'accident_location', 'claim_type', 'apply_amount', 'claim_amount', 'receipt', 'certificate', 'deposit_book', 'x_ray', 'sign', 'claim_date', 'application_scan_id', 'note'] or content in form")

    name, student_number, email, address, phone, identity_number, accident_reason, accident_type, accident_date, accident_location, claim_type, apply_amount, claim_amount, receipt, certificate, deposit_book, x_ray, sign, claim_date, application_scan_id, note = api_input_get(
        [
            'name', 'student_number', 'email', 'address', 'phone', 'identity_number', 'accident_reason',
            'accident_type', 'accident_date', 'accident_location', 'claim_type', 'apply_amount', 'claim_amount',
            'receipt', 'certificate', 'deposit_book', 'x_ray', 'sign', 'claim_date', 'application_scan_id', 'note'
        ], request.form)

    insurance = Insurance(
        name=name,
        student_number=student_number,
        email=email,
        address=address,
        phone=phone,
        identity_number=identity_number,
        accident_reason=accident_reason,
        accident_type=accident_type,
        accident_date=accident_date,
        accident_location=accident_location,
        claim_type=claim_type,
        apply_amount=apply_amount,
        claim_amount=claim_amount,
        receipt=receipt,
        certificate=certificate,
        deposit_book=deposit_book,
        x_ray=x_ray,
        sign=sign,
        claim_date=claim_date,
        application_scan_id=application_scan_id,
        note=note
    )
    db.session.add(insurance)
    db.session.commit()
    return Response.response('upload post success', insurance.as_dict())


@insurance_blueprint.route('/<int:insurance_id>', methods=['PUT'])
@authorization_required(1)
def update_insurance(insurance_id):
    """
    update insurance by insurance_id
    ---
    tags:
      - insurance
    parameters:
      - in: path
        name: insurance_id
        required: true
        schema:
        type: integer
      - in: formData
        name: name
        required: true
        schema:
        type: string
      - in: formData
        name: student_number
        required: true
        schema:
        type: string
      - in: formData
        name: email
        required: true
        schema:
        type: string
      - in: formData
        name: address
        required: true
        schema:
        type: string
      - in: formData
        name: phone
        required: true
        schema:
        type: string
      - in: formData
        name: identity_number
        required: true
        schema:
        type: string
      - in: formData
        name: accident_reason
        required: true
        schema:
        type: string
      - in: formData
        name: accident_type
        required: true
        schema:
        type: string
      - in: formData
        name: accident_date
        required: true
        schema:
        type: string
      - in: formData
        name: accident_location
        required: true
        schema:
        type: string
      - in: formData
        name: claim_type
        required: true
        schema:
        type: string
      - in: formData
        name: apply_amount
        required: true
        schema:
        type: integer
      - in: formData
        name: claim_amount
        required: true
        schema:
        type: integer
      - in: formData
        name: receipt
        required: true
        schema:
        type: string
      - in: formData
        name: certificate
        required: true
        schema:
        type: string
      - in: formData
        name: deposit_book
        required: true
        schema:
        type: boolean
      - in: formData
        name: x_ray
        required: true
        schema:
        type: boolean
      - in: formData
        name: sign
        required: true
        schema:
        type: string
      - in: formData
        name: claim_date
        required: true
        schema:
        type: string
      - in: formData
        name: application_scan_id
        required: true
        schema:
        type: string
      - in: formData
        name: note
        required: true
        schema:
        type: string
    responses:
      200:
        description: update post successful
      404:
        description: insurance not found
      400:
        description: no ['name', 'student_number', 'email', 'address', 'phone', 'identity_number', 'accident_reason', 'accident_type', 'accident_date', 'accident_location', 'claim_type', 'apply_amount', 'claim_amount', 'receipt', 'certificate', 'deposit_book', 'x_ray', 'sign', 'claim_date', 'application_scan_id', 'note'] or content in form
    """
    insurance = Insurance.query.get(insurance_id)

    if not insurance:
        return Response.not_found('insurance not found', None)

    if not api_input_check([
        'name', 'student_number', 'email', 'address', 'phone', 'identity_number', 'accident_reason', 'accident_type',
        'accident_date', 'accident_location', 'claim_type', 'apply_amount', 'claim_amount', 'receipt', 'certificate',
        'deposit_book', 'x_ray', 'sign', 'claim_date', 'application_scan_id', 'note'
    ], request.form):
        Response.client_error(
            "no ['name', 'student_number', 'email', 'address', 'phone', 'identity_number', 'accident_reason', 'accident_type', 'accident_date', 'accident_location', 'claim_type', 'apply_amount', 'claim_amount', 'receipt', 'certificate', 'deposit_book', 'x_ray', 'sign', 'claim_date', 'application_scan_id', 'note'] or content in form")

    name, student_number, email, address, phone, identity_number, accident_reason, accident_type, accident_date, accident_location, claim_type, apply_amount, claim_amount, receipt, certificate, deposit_book, x_ray, sign, claim_date, application_scan_id, note = api_input_get(
        [
            'name', 'student_number', 'email', 'address', 'phone', 'identity_number', 'accident_reason',
            'accident_type', 'accident_date', 'accident_location', 'claim_type', 'apply_amount', 'claim_amount',
            'receipt', 'certificate', 'deposit_book', 'x_ray', 'sign', 'claim_date', 'application_scan_id', 'note'
        ], request.form)

    insurance.name = name
    insurance.student_number = student_number
    insurance.email = email
    insurance.address = address
    insurance.phone = phone
    insurance.identity_number = identity_number
    insurance.accident_reason = accident_reason
    insurance.accident_type = accident_type
    insurance.accident_date = accident_date
    insurance.accident_location = accident_location
    insurance.claim_type = claim_type
    insurance.apply_amount = apply_amount
    insurance.claim_amount = claim_amount
    insurance.receipt = receipt
    insurance.certificate = certificate
    insurance.deposit_book = deposit_book
    insurance.x_ray = x_ray
    insurance.sign = sign
    insurance.claim_date = claim_date
    insurance.application_scan_id = application_scan_id
    insurance.note = note
    db.session.commit()
    return Response.response('update post successful', insurance.as_dict())


@insurance_blueprint.route('/<int:insurance_id>', methods=['DELETE'])
@authorization_required(1)
def delete_insurance(insurance_id):
    """
    delete insurance by insurance_id
    ---
    tags:
      - insurance
    parameters:
      - in: path
        name: insurance_id
        required: true
        schema:
        type: integer
    responses:
      200:
        description: delete post successful
      404:
        description: insurance not found
    """
    Insurance.query.get(insurance_id).delete()
    db.session.commit()
    return Response.response('delete post successful', None)
