from models.models import db, User
from models.responses import Response
import config

from script.oauth_scripts import *

from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from flask import Blueprint, request, redirect, current_app

auth_blueprint = Blueprint('auth', __name__)


@auth_blueprint.route("", methods=['GET'])
@authorization_required([-1])
def get_authorization():
    """
    Get Authorization
    ---
    tags:
      - Auth
    security:
    - BearerAuth: []
    responses:
      200:
        description: Return a success message
      404:
        description: Return a client column not found message
    """
    user_id = get_jwt_identity()['id']
    user = User.query.get(user_id)
    if user is None:
        return Response.not_found('user not found')
    return Response.response('get user success', user.as_dict())


@auth_blueprint.route("/refresh", methods=['POST'])
@jwt_required()
def refresh_token():
    """
    Refresh Token
    ---
    tags:
      - Auth
    security:
      - BearerAuth: []
    responses:
      200:
        description: Return a success message
      404:
        description: Return a client column not found message
    """
    user_id = get_jwt_identity()['id']
    user = User.query.get(user_id)
    if user is None:
        return Response.not_found('user not found')
    access_token = create_access_token(identity={
        'id': user.id,
        'chinese_name': user.chinese_name,
        'authorization': user.authorization,
    })
    return Response.response('refresh access token success', {'access_token': access_token})


@auth_blueprint.route("/token", methods=['GET'])
def get_token():
    """
    Get token
    ---
    tags:
        - Auth
    parameters:
      - name: state
        in: query
        type: string
        required: true
        description: state
    responses:
      200:
        description: Return a success message
      404:
        description: Return a client column not found message
    """

    if 'state' not in request.args:
        return Response.client_error('state not found')
    state = request.args['state']
    user = User.query.filter_by(state=state).first()
    if user is None:
        return Response.not_found('state not found')
    access_token = create_access_token(identity={
        'id': user.id,
        'chinese_name': user.chinese_name,
        'authorization': user.authorization,
    })
    return Response.response('get access token success', {'access_token': access_token})


@auth_blueprint.route("/return-to", methods=['GET'])
def return_to():
    """
    Return To
    ---
    tags:
      - Auth
    parameters:
      - name: code
        in: query
        type: string
        required: true
        description: code
      - name: state
        in: query
        type: integer
        required: true
        description: state
    responses:
      200:
        description: Return a success message
      404:
        description: Return a client column not found message
    """

    code, state = request.args['code'], request.args['state']
    access_token = get_oauth_access_token(code, state)
    oauth_info = get_user_info(access_token)

    if User.query.get(oauth_info['identifier']) is None:
        user = User(id=oauth_info['identifier'], chinese_name=oauth_info['chineseName'], state=state)
        db.session.add(user)
    else:
        user = User.query.get(oauth_info['identifier'])
        user.state = state

    db.session.commit()
    return redirect(f'{config.Config.FRONTEND_URL}/redirect')

