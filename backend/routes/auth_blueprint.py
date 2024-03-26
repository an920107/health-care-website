from models.models import db, OauthTmpInfo, User
from models.responses import Response

from script.oauth_scripts import *

from flask import Blueprint, request, redirect

auth_blueprint = Blueprint('auth', __name__)


@auth_blueprint.route("/<int:state>", methods=['GET'])
def get_access_token(state):
    """
    Get Access Token
    ---
    tags:
      - Auth
    parameters:
      - name: state
        in: path
        type: integer
        required: true
        description: state
    responses:
      200:
        description: Return a success message
      404:
        description: Return a client column not found message
    """
    oauth_tmp_info = OauthTmpInfo.query.filter_by(state=state)
    if oauth_tmp_info is None:
        return Response.not_found('state not found')

    access_token = oauth_tmp_info.access_token

    oauth_info = get_user_info(access_token)
    user = User.query.get(oauth_info['id'])

    if user is None:
        user = User(id=oauth_info['id'], chinese_name=oauth_info['chineseName'])
        db.session.add(user)
        db.session.commit()

    return Response.response('get post success', {
        'access_token': access_token, 'authorization': access_token
    })


@auth_blueprint.route("/return-to", methods=['GET'])
def return_to():
    """
    Return to
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
        type: string
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
    oauth_tmp_info = OauthTmpInfo(state=state, access_token=access_token)
    db.session.add(oauth_tmp_info)
    db.session.commit()
    return redirect('https://health-care-dev.squidspirit.com/redirect')
