# -*- coding: utf-8 -*-
import logging

from config import Config

from models.models import db, TotalViewer
from models.extensions import jwt
from models.responses import Response

from routes.post_blueprint import post_blueprint
from routes.image_blueprint import image_blueprint
from routes.attachment_blueprint import attachment_blueprint
from routes.static_post_blueprint import static_post_blueprint
from routes.carousel_blueprint import carousel_blueprint
from routes.auth_blueprint import auth_blueprint
from routes.restaurant_post_blueprint import restaurant_post_blueprint
from routes.user_blueprint import user_blueprint
from routes.insurance_plueprint import insurance_blueprint
from routes.dengue_blueprint import dengue_blueprint

from flask import Flask, request, send_file, redirect
from flask_cors import CORS
from flasgger import Swagger


def create_app():
    app = Flask(__name__)
    app.register_blueprint(post_blueprint, url_prefix='/api/post')
    app.register_blueprint(image_blueprint, url_prefix='/api/image')
    app.register_blueprint(attachment_blueprint, url_prefix='/api/attachment')
    app.register_blueprint(static_post_blueprint, url_prefix='/api/static_post')
    app.register_blueprint(carousel_blueprint, url_prefix='/api/carousel')
    app.register_blueprint(auth_blueprint, url_prefix='/api/auth')
    app.register_blueprint(restaurant_post_blueprint, url_prefix='/api/restaurant_post')
    app.register_blueprint(user_blueprint, url_prefix='/api/user')
    app.register_blueprint(insurance_blueprint, url_prefix='/api/insurance')
    app.register_blueprint(dengue_blueprint, url_prefix='/api/dengue')

    app.config.from_mapping({
        'SQLALCHEMY_DATABASE_URI': 'sqlite:///health-care-website.db',
        'SWAGGER': {
            "title": "health-care-backend",
            "description": "Nation Central University Health Care Backend Development",
            "version": "2.0.0",
        },
        'JWT_SECRET_KEY': Config.JWT_SECRET_KEY
    })

    db.init_app(app)
    swagger = Swagger(
        app,
        template={
            "securityDefinitions": {
                "BearerAuth": {
                    "type": "apiKey",
                    "name": "Authorization",
                    "in": "header"
                }
            }
        }
    )
    CORS(app)
    jwt.init_app(app)

    handler = logging.FileHandler('./statics/app.log')
    handler.setLevel(logging.INFO)
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    handler.setFormatter(formatter)
    app.logger.addHandler(handler)

    return app


app = create_app()

with app.app_context():
    # db.session.remove()
    # db.drop_all()
    db.create_all()



@app.errorhandler(Exception)
def error_handler(error: Exception):
    app.logger.error(f'Error on path {request.path}: {error}')
    return Response.sever_error(str(error))


@app.route("/", methods=['GET'])
def test_connection():
    """
    Test the connection
    ---
    tags:
      - Test
    responses:
      200:
        description: connect success
    """
    return Response.response('connect success')


@app.route("/api/total_viewer", methods=['GET'])
def get_total_viewer():
    """
    Get total viewer
    ---
    tags:
      - Viewer
    responses:
      200:
        description: return total viewer
    """
    if not TotalViewer.query.all():
        tv = TotalViewer(viewer=1)
        db.session.add(tv)
        db.session.commit()

    tv = TotalViewer.query.first()
    tv.viewer += 1
    db.session.commit()
    return Response.response('connect success', tv.as_dict())


@app.route("/api/allow_endswith", methods=['GET'])
def get_allow_endswith():
    """
    Get allow endswith
    ---
    tags:
      - Config
    responses:
      200:
        description: return allow endswith
    """
    return Response.response('connect success', Config.ALLOW_IMAGE_ENDSWITH + Config.ALLOW_FILE_ENDSWITH)


if __name__ == '__main__':
    app.run(debug=False, host="0.0.0.0", port=5003)
