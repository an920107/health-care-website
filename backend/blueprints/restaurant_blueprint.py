import math
from datetime import datetime

from helpers.CustomResponse import CustomResponse

from models.restaurant_model import Restaurant, db
from flask import Blueprint, request
from sqlalchemy import desc, or_

restaurant_blueprint = Blueprint('restaurant', __name__)


class RestaurantContainer:
    def __init__(self, json_request):

        if "title" not in json_request:
            raise "Title is required."
        if "category" not in json_request:
            raise "Category is required."
        if "item" not in json_request:
            raise "Item is required."
        if "attachments" not in json_request:
            raise "Attachments is required."
        if "valid" not in json_request:
            raise "Valid is required."
        if "visibility" not in json_request:
            raise "Visibility is required."
        if "inspected_time" not in json_request:
            raise "Inspected time is required."

        self.data = {
            "title": json_request['title'],
            "title_en": json_request['title_en'],
            "category": json_request['category'],
            "item": json_request['item'],
            "item_en": json_request['item_en'],
            "attachments": json_request['attachments'],
            "valid": json_request['valid'],
            "visibility": json_request['visibility'],
            "inspected_time": datetime.fromisoformat('2020-01-06T00:00:00.000Z')
        }

    def get_data(self):
        return self.data


@restaurant_blueprint.route('<int:id_>', methods=['GET'])
def get_restaurant(id_):
    """
    get restaurant
    ---
    tags:
        - restaurant
    responses:
      200:
        description: get restaurant success
        schema:
          id: Restaurant
      404:
        description: restaurant not found
        schema:
          id: NotFound
    """
    restaurant = db.session.query(Restaurant).get(id_)

    if restaurant is None:
        return CustomResponse.not_found("Restaurant not found", {})

    return CustomResponse.success("get restaurant success", restaurant.to_dict())


@restaurant_blueprint.route('', methods=['GET'])
def get_restaurants():
    """
    get restaurants
    ---
    tags:
        - restaurant
    parameters:
      - in: query
        name: page
        type: integer
        require: false
      - in: query
        name: category
        type: string
        require: false
      - in: query
        name: search
        type: string
        require: false
      - in: query
        name: visibility
        type: boolean
        require: false
    responses:
      200:
        description: get restaurants success
        schema:
          id: RestaurantQuery
    """
    page = int(request.args['page']) \
        if "page" in request.args and int(request.args['page']) > 1 \
        else 1

    restaurants = db.session.query(Restaurant)

    if "search" in request.args:
        restaurants = restaurants.filter(
            or_(*[Restaurant.title.like(f'%{term}%') for term in request.args['search'].split('+')]))

    if "category" in request.args:
        restaurants = restaurants.filter(
            Restaurant.category.in_(request.args['category'].split('+'))
        )

    if "visibility" in request.args:
        restaurants = restaurants.filter(
            Restaurant.visibility == (False if request.args['visibility'] == 'false' else True)
        )

    restaurants = restaurants.order_by(desc(Restaurant.created_time)).all()
    total_page = math.ceil(len(restaurants) // 10)
    restaurants = [post.to_dict() for post in restaurants][(page - 1) * 10:page * 10]

    return {'message': "get posts success", 'data': restaurants, "total_page": total_page}, 200


@restaurant_blueprint.route('', methods=['POST'])
def post_restaurant():
    """
    post restaurant
    ---
    tags:
      - restaurant
    parameters:
      - in: body
        name: json
        required: true
        schema:
          id: RestaurantInput
    responses:
      201:
        description: post restaurant success
        schema:
          id: Restaurant
      422:
        description: post restaurant success
        schema:
          id: UnprocessableContent
    """
    try:
        request_payload = RestaurantContainer(request.json).get_data()
    except Exception as e:
        return CustomResponse.unprocessable_content(str(e), {})

    restaurant = Restaurant(**request_payload)
    db.session.add(restaurant)
    db.session.commit()

    return CustomResponse.created("post restaurant success", restaurant.to_dict())


@restaurant_blueprint.route('<int:id_>', methods=['PATCH'])
def patch_restaurant(id_):
    """
    patch restaurant
    ---
    tags:
      - restaurant
    parameters:
      - name: id_
        in: path
        type: integer
        required: true
      - in: body
        name: json
        required: true
        schema:
          id: RestaurantInput
    responses:
      204:
        description: patch restaurant success
        schema:
          id: Restaurant
      404:
        description: restaurant not found
        schema:
          id: NotFound
    """
    restaurant = db.session.query(Restaurant).get(id_)

    if restaurant is None:
        return CustomResponse.not_found("Post not found", {})

    if "title" in request.json:
        restaurant.title = request.json['title']
    if "category" in request.json:
        restaurant.category = request.json['category']
    if "item" in request.json:
        restaurant.item = request.json['item']
    if "attachments" in request.json:
        restaurant.attachments = request.json['attachments']
    if "valid" in request.json:
        restaurant.valid = request.json['valid']
    if "visibility" in request.json:
        restaurant.visibility = request.json['visibility']
    if "inspected_time" in request.json:
        restaurant.inspected_time = datetime.fromisoformat(request.json['inspected_time'])

    db.session.commit()
    return CustomResponse.no_content("patch restaurant success", restaurant.to_dict())


@restaurant_blueprint.route('<int:id_>', methods=['DELETE'])
def delete_restaurant(id_):
    """
    delete restaurant
    ---
    tags:
      - restaurant
    parameters:
      - name: id_
        in: path
        type: integer
        required: true
    responses:
      200:
        description: delete restaurant success
      404:
        description: restaurant not found
        schema:
          id: NotFound
    """
    restaurant = db.session.query(Restaurant).get(id_)

    if restaurant is None:
        return CustomResponse.not_found("Restaurant not found", {})

    db.session.delete(restaurant)
    db.session.commit()

    return CustomResponse.no_content("delete restaurant success", {})
