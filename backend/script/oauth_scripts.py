import requests
from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt
from models.responses import Response


def authorization_required(required_role):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            if 'authorization' in claims and -1 < claims['authorization'] <= required_role:
                return fn(*args, **kwargs)
            else:
                return Response.unauthorized('Unauthorized')

        return wrapper

    return decorator


def get_oauth_access_token(code, state):
    url = ' https://portal.ncu.edu.tw/oauth2/token'
    headers = {
        'Accept': 'application/json',
        'Authorization': 'Basic MjAyNDAzMDUwMDUyMjJiamZzN3lENkNpd1Q6TFc2Nm4xVXY3d2hlNlY5QkxZU3J3YTBIRThmbVpldVhZV0d1N0FTVWNxWTRSUmcyYk54Mw=='
    }
    data = {
        'grant_type': 'authorization_code',
        'code': code,
        'state': state,
        'redirect_url': 'https://api.spuidspirit.com/health/rta',
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
