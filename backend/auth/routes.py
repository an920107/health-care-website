from flask import Blueprint, current_app, request, redirect
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

from package.database_operator import *

from package.response import Response

from script.utils import *
from script.oauth_scripts import *

auth_blueprints = Blueprint('auth', __name__)


@auth_blueprints.route("/get_access_token", methods=['GET'])
def get_access_token():
    """
    Get posts in three ways.
    ---
    tags:
      - Auth
    parameters:
      - name: state
        in: query
        type: string
        required: false
        description: The id of the post
    responses:
      200:
        description: Return a success message
        schema:
          type: object
          properties:
            authorization:
              type: string
            access_token:
              type: string
      400:
        description: Return a client error message
      404:
        description: Return a client column not found message
      500:
        description: Return a sever error message
    """
    if 'state' not in request.args:
        return Response.client_error('no state in form')

    state = request.args['state']

    oauth_tmp_info = DatabaseOperator.select_one(OauthTmpInfo, {'state': state})
    if oauth_tmp_info is None:
        return Response.not_found('state not found')

    access_token = oauth_tmp_info.access_token
    # DatabaseOperator.delete(OauthTmpInfo, {'state': state})

    oauth_info = get_user_info(access_token)
    user = DatabaseOperator.select_one(User, {'id': oauth_info['id']})

    if user is None:
        user = DatabaseOperator.insert(User, {
            'id': oauth_info['id'],
            'chinese_name': oauth_info['chineseName']
        })

    access_token = create_access_token(identity=user.id)
    return Response.response('get post success', {
        'access_token': access_token, 'authorization': user.authorization
    })


@auth_blueprints.route("/return-to", methods=['GET'])
def return_to():
    """
    return To address of ncu OAuth.
    ---
    tags:
      - Auth
    responses:
      200:
        description: Connection successful.
    """

    code, state = request.args['code'], request.args['state']

    access_token = get_oauth_access_token(code, state)
    DatabaseOperator.insert(OauthTmpInfo, {'state': state, 'access_token': access_token})

    return redirect('https://health-care-dev.squidspirit.com/redirect')


@auth_blueprints.route("/user", methods=['DELETE'])
@jwt_required()
def delete_user():
    """
    return To address of ncu OAuth.
    ---
    tags:
      - Auth
    parameters:
      - name: id
        in: form
        type: string
        required: false
        description: The id of the user
    responses:
      200:
        description: Connection successful.
    """

    op_user_id = get_jwt_identity()
    op_user = DatabaseOperator.select_one(User, {'id': op_user_id})
    if op_user.authorization != 0:
        return Response.forbidden('Insufficient permissions')

    if not api_input_check(['id'], request.form):
        Response.client_error('no id or authorization in form')

    id_ = api_input_get(['id'], request.form)
    DatabaseOperator.delete(User, {'id': id_})
    return Response.response("delete user successful")


@auth_blueprints.route("/user", methods=['PUT'])
@jwt_required()
def update_user():
    """
    return To address of ncu OAuth.
    ---
    tags:
      - Auth
    parameters:
      - name: id
        in: form
        type: string
        required: false
        description: The id of the user
      - name: authorization
        in: form
        type: string
        required: false
        description: The id of the user
    responses:
      200:
        description: Connection successful.
    """

    op_user_id = get_jwt_identity()
    op_user = DatabaseOperator.select_one(User, {'id': op_user_id})
    if op_user.authorization != 0:
        return Response.forbidden('Insufficient permissions')

    if not api_input_check(['id', 'authorization'], request.form):
        Response.client_error('no id or authorization in form')

    id_, authorization = api_input_get(['id', 'authorization'], request.form)
    user = DatabaseOperator.update(User, {'id': id_}, {'authorization': authorization})
    return Response.not_found('user not found') if user is None else Response.response("update user successful")


@auth_blueprints.route("/user", methods=['GET'])
@jwt_required()
def get_user():
    """
    return To address of ncu OAuth.
    ---
    tags:
      - Auth
    responses:
      200:
        description: Connection successful.
    """
    users = DatabaseOperator.select_all(User)
    payload = []

    for user in users:
        payload.append(user.as_dict())

    return Response.response('get user successful', payload)
