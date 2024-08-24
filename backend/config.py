import logging


class Config:
    LOGGING_FORMAT = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    ATTACHMENT_DIR = 'statics/attachments'
    IMAGE_DIR = 'statics/images'
    DOWNLOAD = 'statics/downloads'
    CAROUSEL = 'statics/carousels'
    LOGGING_LEVEL = logging.DEBUG
    PORT = 5004


class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'sqlite:///development-database.db'
    LOGGING_HANDLERS = {
        'console': {
            'level': Config.LOGGING_LEVEL,
            'class': 'logging.StreamHandler',
            'formatter': 'default',
        },
    }


class TestingConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'sqlite:///testing-database.db'
    LOGGING_HANDLERS = {
        'file': {
            'level': Config.LOGGING_LEVEL,
            'class': 'logging.FileHandler',
            'filename': 'logs/TestingLogs.log',
            'formatter': 'default',
        },
    }
