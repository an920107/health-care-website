import json
import uuid
import logging.config
from pathlib import Path

from flask import Flask
from flasgger import Swagger
from flask_cors import CORS

import config
from config import DevelopmentConfig
from models.viewer_model import db, Viewer

from blueprints.attachment_blueprint import attachment_blueprint
from blueprints.image_blueprint import image_blueprint
from blueprints.carousel_blueprint import carousel_blueprint
from blueprints.post_blueprint import post_blueprint
from blueprints.download_blueprint import download_blueprint
from blueprints.building_blueprint import building_blueprint
from blueprints.restaurant_blueprint import restaurant_blueprint
from blueprints.insurance_blueprint import insurance_blueprint
from blueprints.dengue_blueprint import dengue_blueprint
from blueprints.auth_blueprint import auth_blueprint

from helpers.CustomResponse import CustomResponse

from flask_jwt_extended import JWTManager, jwt_required

swagger_template = json.loads(open('docs/swagger_template.json', 'r').read())


def configure_logging(app):
    log_config = {
        'version': 1,
        'disable_existing_loggers': False,
        'handlers': app.config['LOGGING_HANDLERS'],
        'formatters': {
            'default': {
                'format': app.config['LOGGING_FORMAT'],
            },
        }
    }
    logging.config.dictConfig(log_config)


def get_config(status):
    if status == 'development':
        return DevelopmentConfig


def create_app(status='development'):
    app = Flask(__name__)
    app.secret_key = uuid.uuid4().hex

    app.config.from_object(get_config(status))
    configure_logging(app)
    db.init_app(app)

    Swagger(app, template=swagger_template)
    CORS(
        app,
        resources={r"/*": {"origins": "*", "allow_headers": "*", "expose_headers": "*"}},
        supports_credentials=True
    )
    JWTManager(app)

    app.register_blueprint(attachment_blueprint, url_prefix='/api/attachment')
    app.register_blueprint(image_blueprint, url_prefix='/api/image')
    app.register_blueprint(carousel_blueprint, url_prefix='/api/carousel')
    app.register_blueprint(post_blueprint, url_prefix='/api/post')
    app.register_blueprint(download_blueprint, url_prefix='/api/download')
    app.register_blueprint(building_blueprint, url_prefix='/api/building')
    app.register_blueprint(restaurant_blueprint, url_prefix='/api/restaurant')
    app.register_blueprint(insurance_blueprint, url_prefix='/api/insurance')
    app.register_blueprint(dengue_blueprint, url_prefix='/api/dengue')
    app.register_blueprint(auth_blueprint, url_prefix='/api/auth')

    with app.app_context():
        db.create_all()

    return app


app = create_app()


@app.route('/api/welcome', methods=['GET'])
def welcome():
    """
    get the number of viewers
    ---
    tags:
      - viewer
    responses:
      200:
        description: Welcome to the API!
        schema:
          id: Viewer
    """
    viewer = db.session.query(Viewer).first()
    if db.session.query(Viewer).first() is None:
        viewer = Viewer()
        db.session.add(viewer)
        db.session.commit()

    viewer.viewer += 1
    db.session.commit()
    return CustomResponse.success("get viewer successful", viewer.to_dict())


if __name__ == '__main__':
    for folder_name in [
        config.Config.IMAGE_DIR, config.Config.DOWNLOAD, config.Config.CAROUSEL, config.Config.ATTACHMENT_DIR]:
       Path(folder_name).mkdir(parents=True, exist_ok=True)

    app.run(debug=False, host="0.0.0.0", port=config.Config.PORT)
