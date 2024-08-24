import json
import uuid
import logging.config
import os

from flask import Flask
from flasgger import Swagger
from flask_cors import CORS

import config
from config import DevelopmentConfig, TestingConfig
from models.database import db

from blueprints.attachment_blueprint import attachment_blueprint
from blueprints.image_blueprint import image_blueprint
from blueprints.carousel_blueprint import carousel_blueprint
from blueprints.post_blueprint import post_blueprint
from blueprints.download_blueprint import download_blueprint
from blueprints.building_blueprint import building_blueprint
from blueprints.restaurant_blueprint import restaurant_blueprint
from blueprints.insurance_blueprint import insurance_blueprint

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
    elif status == 'testing':
        return TestingConfig
    else:
        raise ValueError(f"Unknown status: {status}")


def create_app(status='development'):
    app = Flask(__name__)
    app.secret_key = uuid.uuid4().hex

    config = get_config(status)
    app.config.from_object(config)
    configure_logging(app)
    db.init_app(app)

    Swagger(app, template=swagger_template)
    CORS(app, resources={r"/*": {"origins": "*", "allow_headers": "*", "expose_headers": "*"}}, )

    app.register_blueprint(attachment_blueprint, url_prefix='/api/attachment')
    app.register_blueprint(image_blueprint, url_prefix='/api/image')
    app.register_blueprint(carousel_blueprint, url_prefix='/api/carousel')
    app.register_blueprint(post_blueprint, url_prefix='/api/post')
    app.register_blueprint(download_blueprint, url_prefix='/api/download')
    app.register_blueprint(building_blueprint, url_prefix='/api/building')
    app.register_blueprint(restaurant_blueprint, url_prefix='/api/restaurant')
    app.register_blueprint(insurance_blueprint, url_prefix='/api/insurance')


    return app


app = create_app()

if __name__ == '__main__':
    app.run(debug=False, host="0.0.0.0", port=config.Config.PORT)
