from models.models import db, User
from models.responses import Response

from script.oauth_scripts import authorization_required

from flask_jwt_extended import get_jwt_identity, jwt_required
from flask import Blueprint, request

user_blueprint = Blueprint('user', __name__)


@user_blueprint.route("", methods=['GET'])
@authorization_required([0])
def get_users():
    """
    Get Users
    ---
    tags:
      - User
    security:
    - BearerAuth: []
    responses:
      200:
        description: Return a success message
      404:
        description: Return a client column not found message
    """
    users = User.query.all()
    users.sort(key=lambda x: x.authorization)
    return Response.response('get user success', [u.as_dict() for u in users])


@user_blueprint.route("/<string:user_id>/authorization", methods=['PATCH'])
@authorization_required([0])
def patch_user_authorization(user_id):
    """
    Patch User Authorization
    ---
    tags:
      - User
    security:
    - BearerAuth: []
    parameters:
      - name: user_id
        in: path
        type: integer
        required: true
        description: user id
    responses:
      200:
        description: Return a success message
    """
    user = User.query.get(user_id)
    if user is None:
        return Response.not_found('user not found')
    user.authorization = int(request.form['authorization'])
    db.session.commit()
    return Response.response('patch user authorization success', user.as_dict())


@user_blueprint.route("/<string:user_id>", methods=['DELETE'])
@authorization_required([0])
def delete_user(user_id):
    """
    Delete User
    ---
    tags:
      - User
    security:
    - BearerAuth: []
    parameters:
      - name: user_id
        in: path
        type: integer
        required: true
        description: user id
    responses:
      200:
        description: Return a success message
    """
    user = User.query.get(user_id)
    if user is None:
        return Response.response('user not found')
    db.session.delete(user)
    db.session.commit()
    return Response.response('delete user success')
