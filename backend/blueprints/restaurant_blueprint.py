import io
import math
from datetime import datetime

from helpers.CustomResponse import CustomResponse

from helpers.auth_helpers import authorization_required
from models.restaurant_model import Restaurant, db
from flask import Blueprint, request, send_file
from sqlalchemy import desc, or_
import pandas as pd

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
            "inspected_time": datetime.fromisoformat(json_request['inspected_time'])
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
    restaurant.viewer += 1
    db.session.commit()

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
@authorization_required([0, 1, 2])
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
@authorization_required([0, 1, 2])
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
@authorization_required([0, 1, 2])
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


@restaurant_blueprint.route('report', methods=['GET'])
def get_restaurant_stats():
    """
    get restaurant report
    ---
    tags:
      - restaurant
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
        example: "2021-01-01"
        description: The end time
    responses:
      200:
        description: get dengue report success
    """
    from_time = datetime.fromisoformat(request.args['from'])
    to_time = datetime.fromisoformat(request.args['to'])

    if from_time > to_time:
        return CustomResponse.unprocessable_content('from time should be less than to time', {})

    restaurants = Restaurant.query.filter(
        Restaurant.inspected_time >= from_time, Restaurant.inspected_time <= to_time).all()

    category_validation_count = {
        'water': {'total': 0, '1': 0, '0': 0, 'valid_rate': 0},
        'food': {'total': 0, '1': 0, '0': 0, 'valid_rate': 0},
        'drink': {'total': 0, '1': 0, '0': 0, 'valid_rate': 0},
        'ice': {'total': 0, '1': 0, '0': 0, 'valid_rate': 0},
        'others': {'total': 0, '1': 0, '0': 0, 'valid_rate': 0},
        'total': {'total': 0, '1': 0, '0': 0, 'valid_rate': 0}
    }

    for post in restaurants:
        category_validation_count[post.category][str(int(post.valid))] += 1
        category_validation_count[post.category]['total'] += 1
        category_validation_count['total'][str(int(post.valid))] += 1
        category_validation_count['total']['total'] += 1

    for category, count in category_validation_count.items():
        if count['total'] != 0:
            count['valid_rate'] = count['1'] / count['total']

    df = pd.DataFrame(category_validation_count).T
    df.columns = ['總件數', '合格幾件', '不合格幾件', '合格率']
    df['類別'] = ['飲用水', '熟食', '飲料', '冰塊', '其他', '總和']
    df = df[['類別', '總件數', '合格幾件', '不合格幾件', '合格率']]

    output = io.BytesIO()
    with pd.ExcelWriter(output, engine='openpyxl') as writer:
        df = df.T.reset_index().T.reset_index()
        df.loc[len(df)] = [
            None, None, '開始日期', from_time.strftime('%Y-%m-%d'), '結束日期', to_time.strftime('%Y-%m-%d')]
        df.to_excel(writer, index=False, header=False, sheet_name="總表")

    output.seek(0)
    return send_file(
        output,
        as_attachment=True,
        download_name='登革熱報表.xlsx'
    )
