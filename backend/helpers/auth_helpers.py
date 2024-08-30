from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt
from helpers.CustomResponse import CustomResponse
from models.user_model import User


def authorization_required(required_role):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            verify_jwt_in_request(locations=['headers', 'cookies'])
            user_id = get_jwt()['sub']['id']
            user = User.query.get(user_id)

            if not user:
                return CustomResponse.unauthorized('authorization not found', {})
            if user.role not in required_role:
                return CustomResponse.unauthorized('authorization not found', {})
            else:
                return fn(*args, **kwargs)

        return wrapper
    return decorator
