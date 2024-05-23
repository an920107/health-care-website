import requests
from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt
from models.responses import Response
from config import Config


def authorization_required(required_role):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            if 'sub' not in claims:
                return Response.client_error('authorization not found')
            if -1 in required_role:
                return fn(*args, **kwargs)
            if claims['sub']['authorization'] not in required_role:
                return Response.unauthorized('authorization not enough', f"authorization needed in {required_role}")
            else:
                return fn(*args, **kwargs)

        return wrapper

    return decorator


def get_oauth_access_token(code, state):
    url = ' https://portal.ncu.edu.tw/oauth2/token'
    headers = {
        'Accept': 'application/json',
        'Authorization': 'Basic ' + Config.Basic_Auth
    }
    data = {
        'grant_type': 'authorization_code',
        'code': code,
        'state': state,
        'redirect_url': Config.FRONTEND_URL + '/health/rta',
    }

    response = requests.post(url, headers=headers, data=data)
    response = response.json()

    return response['access_token']


def get_user_info(access_token):
    url = 'https://portal.ncu.edu.tw/apis/oauth/v1/info'

    headers = {
        'Accept': 'application/json',
        'Authorization': f'Bearer {access_token}'
    }

    response = requests.get(url, headers=headers)
    response = response.json()

    return response
