import uuid
import logging.config
import os

from flask import Flask
from flasgger import Swagger
from flask_cors import CORS
from config import DevelopmentConfig, ProductionConfig, TestingConfig
from models.database import db
from flask_migrate import Migrate


def configure_logging(app):
    log_config = {
        'version': 1,
        'disable_existing_loggers': False,
        'handlers': {
            'file': {
                'level': app.config['LOGGING_LEVEL'],
                'class': 'logging.FileHandler',
                'filename': app.config['LOGGING_FILENAME'],
                'formatter': 'default',
            },
        },
        'formatters': {
            'default': {
                'format': app.config['LOGGING_FORMAT'],
            },
        },
        'root': {
            'level': app.config['LOGGING_LEVEL'],
            'handlers': ['file']
        }
    }
    logging.config.dictConfig(log_config)


def get_config(status):
    if status == 'development':
        return DevelopmentConfig
    elif status == 'production':
        return ProductionConfig
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
    migrate = Migrate(app, db)

    with app.app_context():
        db.drop_all()
        db.create_all()
        db.session.commit()

    Swagger(app)

    CORS(app, resources={r"/*": {"origins": "*", "allow_headers": "*", "expose_headers": "*"}}, )

    return app


app = create_app()

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5003)
