import os
from uuid import uuid4
from pathlib import Path

from helpers.CustomResponse import CustomResponse

from models.building_model import Building, db
from flask import Blueprint, request, send_file, current_app

building_blueprint = Blueprint('building', __name__)


class BuildingContainer:
    def __init__(self, json_request):
        if "name" not in json_request:
            raise "name is required."
        if "user_id" not in json_request:
            raise "user id is required."

        self.data = {
            "name": json_request["name"],
            "user_id": json_request["user_id"],
        }

    def get_data(self):
        return self.data


@building_blueprint.route('', methods=['GET'])
def get_buildings():
    """
    get building
    ---
    tags:
      - building
    responses:
      200:
        description: get building success
        schema:
          id: BuildingQuery
    """
    buildings = Building.query.all()
    return CustomResponse.success("get buildings success", [building.to_dict() for building in buildings])


@building_blueprint.route('<int:id_>', methods=['GET'])
def get_building(id_):
    """
    get building
    ---
    tags:
      - building
    parameters:
      - name: id_
        in: path
        type: integer
        required: true
    responses:
      200:
        description: get building success
        schema:
          id: Building
    """
    building = db.session.query(Building).get(id_)

    if building is None:
        return CustomResponse.not_found("Building not found", {})

    return CustomResponse.success("get buildings success", building.to_dict())


@building_blueprint.route('', methods=['POST'])
def post_building():
    """
    post building
    ---
    tags:
      - building
    parameters:
      - in: body
        name: body
        schema:
          id: BuildingInput
    responses:
      200:
        description: post building success
        schema:
          id: Building
    """
    try:
        request_payload = BuildingContainer(request.json).get_data()
    except Exception as e:
        return CustomResponse.unprocessable_content(e, {})

    building = Building(**request_payload)
    db.session.add(building)
    db.session.commit()

    return CustomResponse.created("post building success", building.to_dict())


@building_blueprint.route('<int:id_>', methods=['PATCH'])
def patch_building(id_):
    """
    patch building
    ---
    tags:
      - building
    parameters:
      - name: id_
        in: path
        type: integer
        required: true
      - in: body
        name: json
        required: true
        schema:
          id: BuildingInput
    responses:
      204:
        description: patch building success
        schema:
          id: Building
      404:
        description: building not found
        schema:
          id: NotFound
    """
    building = Building.query.get(id_)

    if building is None:
        return CustomResponse.not_found("Building not found", {})

    if "name" in request.json:
        building.name = request.json["name"]
    if "user_id" in request.json:
        building.user_id = request.json["user_id"]

    db.session.commit()

    return CustomResponse.no_content("patch building success", {})


@building_blueprint.route('<int:id_>', methods=['DELETE'])
def delete_building(id_):
    """
    delete building
    ---
    tags:
      - building
    parameters:
      - name: id_
        in: path
        type: integer
        required: true
    responses:
      204:
        description: delete building success
      404:
        description: building not found
        schema:
          id: NotFound
    """
    building = Building.query.get(id_)

    if building is None:
        return CustomResponse.not_found("Building not found", {})

    db.session.delete(building)
    db.session.commit()

    return CustomResponse.no_content("delete building success", {})
