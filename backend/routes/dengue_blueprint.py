from models.models import Building, db, BuildingUser, Dengue

import pandas as pd
from openpyxl import Workbook

from script.utils import api_input_check, api_input_get
from script.oauth_scripts import authorization_required

from models.models import StaticPost, db, StaticImage, StaticAttachment
from models.responses import Response

from flask import Blueprint, request, send_file
from flask_jwt_extended import get_jwt_identity

dengue_blueprint = Blueprint('dengue', __name__)


@dengue_blueprint.route('/building', methods=['GET'])
def get_buildings():
    """
    Get all buildings
    ---
    tags:
      - building
    responses:
      200:
        description: Get all buildings
    """
    buildings = Building.query.all()
    return Response.response('get buildings successful', [building.as_dict() for building in buildings])


@dengue_blueprint.route('/building', methods=['POST'])
def create_building():
    """
    Create a building
    ---
    tags:
      - building
    parameters:
      - name: chinese_name
        in: formData
        type: string
        required: true
        description: The chinese name of the building
    """
    if api_input_check(['chinese_name'], request.form):
        return Response.client_error("no ['chinese_name'] in form")

    chinese_name = api_input_get(['chinese_name'], request.form)
    building = Building(chinese_name=chinese_name)
    db.session.add()
    db.session.commit()
    return Response.response('create building successful', building.as_dict())


@dengue_blueprint.route('/building/<int:building_id>', methods=['DELETE'])
def delete_building(building_id):
    """
    Create a building
    ---
    tags:
      - building
    parameters:
      - name: building_id
        in: path
        type: integer
        required: true
        description: The id of the building
    """
    building = Building.query.filter_by(id=building_id).first()
    if building is None:
        return Response.client_error("delete building successful")
    db.session.delete(building)
    db.session.commit()
    return Response.response('delete building successful')


@dengue_blueprint.route('/building-user', methods=['GET'])
def get_building_users():
    """
    Get all building users
    ---
    tags:
      - building user
    responses:
      200:
        description: Get all building users
    """
    building_users = BuildingUser.query.all()
    return Response.response('get building users successful',
                             [building_user.as_dict() for building_user in building_users])


@dengue_blueprint.route('/building-user', methods=['POST'])
def create_building_user():
    """
    Create a building user
    ---
    tags:
      - building user
    parameters:
      - name: building_id
        in: formData
        type: integer
        required: true
        description: The id of the building
      - name: user_id
        in: formData
        type: integer
        required: true
        description: The id of the user
    """
    if api_input_check(['building_id', 'user_id'], request.form):
        return Response.client_error("no ['building_id', 'user_id'] in form")

    building_id, user_id = api_input_get(['building_id', 'user_id'], request.form)
    building_user = BuildingUser(building_id=building_id, user_id=user_id)
    db.session.add(building_user)
    db.session.commit()
    return Response.response('create building user successful', building_user.as_dict())


@dengue_blueprint.route('/building-user/<int:building_id>', methods=['DELETE'])
def delete_building_user(building_id):
    """
    Delete a building user
    ---
    tags:
      - building user
    parameters:
      - name: building_id
        in: path
        type: integer
        required: true
        description: The id of the building
    """
    building_user = BuildingUser.query.filter_by(building_id=building_id).first()
    if building_user is None:
        return Response.client_error("delete building user successful")
    db.session.delete(building_user)
    db.session.commit()
    return Response.response('delete building user successful')


@dengue_blueprint.route('/form', methods=['POST'])
def create_form():
    """
    Create a form
    ---
    tags:
      - form
    parameters:
      - name: json_data
        in: formData
        type: string
        required: true
        description: The json data of the form
    """
    json_data = str(request.get_json())
    dengue = Dengue(json_data=json_data)
    db.session.add(dengue)
    db.session.commit()
    return Response.response('create form successful', dengue.as_dict())


@dengue_blueprint.route('/form/<int:form_id>', methods=['POST'])
def delete_form(form_id):
    """
    Delete a form
    ---
    tags:
      - form
    parameters:
      - name: form_id
        in: path
        type: integer
        required: true
        description: The id of the form
    """
    dengue = Dengue.query.get(form_id).delete()
    db.session.delete(dengue)
    db.session.commit()
    return Response.response('delete form successful')


@dengue_blueprint.route('/form/<int:form_id>', methods=['GET'])
def get_form(form_id):
    """
    Get a form
    ---
    tags:
      - form
    parameters:
      - name: form_id
        in: path
        type: integer
        required: true
        description: The id of the form
    """
    dengue = Dengue.query.get(form_id)
    return Response.response('get form successful', dengue.as_dict())


@dengue_blueprint.route('/form', methods=['GET'])
def get_forms():
    """
    Get all forms
    ---
    tags:
      - form
    responses:
      200:
        description: Get all forms
    """
    dengue = Dengue.query.all()
    return Response.response('get forms successful', [dengue.as_dict() for dengue in dengue])

