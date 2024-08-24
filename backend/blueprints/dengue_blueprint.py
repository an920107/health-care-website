from datetime import datetime
from helpers.CustomResponse import CustomResponse

from models.dengue_model import Dengue, db
from flask import Blueprint, request
from sqlalchemy import desc
import math

dengue_blueprint = Blueprint('dengue', __name__)


class DengueContainer:
    COLUMNS = [
        'user_id',
        'building_id',
        'outdoor_bottles_cans',
        'outdoor_urns_tanks',
        'outdoor_tableware',
        'outdoor_pots_kettles',
        'outdoor_disposable_items',
        'outdoor_barrels',
        'outdoor_coconut_shells',
        'outdoor_tires_helmets',
        'outdoor_drainage_covers',
        'outdoor_abandoned_appliances',
        'outdoor_unused_water_towers',
        'outdoor_unused_cooling_equipment',
        'outdoor_large_water_containers',
        'outdoor_pet_water_containers',
        'outdoor_flooded_basement',
        'outdoor_basement_sump',
        'outdoor_utility_meters',
        'outdoor_mailbox',
        'outdoor_incense_burner',
        'outdoor_rain_gear',
        'outdoor_natural_water_containers',
        'outdoor_flagpole_drains',
        'outdoor_decorative_ponds',
        'outdoor_stagnant_gutter',
        'outdoor_other_containers',
        'indoor_plant_containers',
        'indoor_gardening_containers',
        'indoor_water_storage',
        'indoor_appliance_trays',
        'indoor_other_containers',
    ]

    def __init__(self, json_request):
        for column in self.COLUMNS:
            assert column in json_request, f'{column} is required'

        self.data = {column: json_request[column] for column in self.COLUMNS}

    def get_data(self):
        return self.data


@dengue_blueprint.route('<int:id_>', methods=['GET'])
def get_dengue(id_):
    """
    get dengue
    ---
    tags:
      - dengue
    parameters:
      - in: path
        name: id_
        type: integer
        required: true
        description: The dengue id
    responses:
      200:
        description: get dengue success
        schema:
          id: Dengue
      404:
        description: dengue not found
        schema:
          id: NotFound
    """
    dengue = db.session.query(Dengue).get(id_)

    if dengue is None:
        return CustomResponse.not_found('Dengue not found', {})

    return CustomResponse.success('Dengue found', dengue.to_dict())


@dengue_blueprint.route('', methods=['GET'])
def get_dengues():
    """
    get dengues
    ---
    tags:
      - dengue
    parameters:
      - in: query
        name: page
        type: integer
        required: false
        description: The page
    responses:
      200:
        description: get dengue success
        schema:
          id: DengueQuery
    """
    page = int(request.args['page']) \
        if "page" in request.args and int(request.args['page']) > 1 \
        else 1

    dengues = db.session.query(Dengue)
    dengues = dengues.order_by(desc(Dengue.created_time)).all()
    total_page = math.ceil(len(dengues) / 10)
    dengues = [dengue.to_dict() for dengue in dengues][(page - 1) * 10:page * 10]

    return {'message': 'get dengues success', 'data': dengues, 'total_page': total_page}, 200


@dengue_blueprint.route('', methods=['POST'])
def post_dengue():
    """
    post dengue
    ---
    tags:
      - dengue
    parameters:
      - in: body
        name: body
        schema:
          id: DengueInput
    responses:
      201:
        description: post dengue success
        schema:
          id: Dengue
      422:
        description: unprocessable content
        schema:
          id: UnprocessableContent
    """
    try:
        request_payload = DengueContainer(request.json).get_data()
    except Exception as e:
        return CustomResponse.unprocessable_content(str(e), {})

    dengue = Dengue(**request_payload)
    db.session.add(dengue)
    db.session.commit()

    return CustomResponse.created("post insurance success", dengue.to_dict())


@dengue_blueprint.route('<int:id_>', methods=['PATCH'])
def patch_dengue(id_):
    """
    patch dengue
    ---
    tags:
      - dengue
    parameters:
      - in: path
        name: id_
        type: integer
        required: true
        description: The dengue id
      - in: body
        name: body
        schema:
          id: DengueInput
    responses:
      204:
        description: patch dengue success
        schema:
          id: Dengue
      404:
        description: dengue not found
        schema:
          id: NotFound
    """
    dengue = db.session.query(Dengue).get(id_)

    if dengue is None:
        return CustomResponse.not_found('Dengue not found', {})

    for column in DengueContainer.COLUMNS:
        if column in request.json:
            setattr(dengue, column, request.json[column])

    db.session.commit()
    return CustomResponse.success('patch dengue success', dengue.to_dict())


@dengue_blueprint.route('<int:id_>', methods=['DELETE'])
def delete_dengue(id_):
    """
    delete dengue
    ---
    tags:
      - dengue
    parameters:
      - in: path
        name: id_
        type: integer
        required: true
        description: The dengue id
    responses:
      204:
        description: delete insurance success
        schema:
          id: Dengue
      404:
        description: insurance not found
        schema:
          id: NotFound
    """
    dengue = db.session.query(Dengue).get(id_)

    if dengue is None:
        return CustomResponse.not_found("Dengue not found", {})

    db.session.delete(dengue)
    db.session.commit()

    return CustomResponse.no_content("delete dengue success", {})
