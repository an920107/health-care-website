import logging


class Config:
    LOGGING_FORMAT = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    ATTACHMENT_DIR = 'statics/attachments'
    IMAGE_DIR = 'statics/images'


class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'sqlite:///development-database.db'
    LOGGING_LEVEL = logging.DEBUG
    LOGGING_HANDLERS = {
        'console': {
            'level': LOGGING_LEVEL,
            'class': 'logging.StreamHandler',
            'formatter': 'default',
        },
    }


class TestingConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'sqlite:///testing-database.db'
    LOGGING_LEVEL = logging.DEBUG
    LOGGING_HANDLERS = {
        'file': {
            'level': LOGGING_LEVEL,
            'class': 'logging.FileHandler',
            'filename': 'logs/TestingLogs.log',
            'formatter': 'default',
        },
    }


class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'sqlite:///database.db'
    LOGGING_LEVEL = logging.INFO
    LOGGING_HANDLERS = {
        'file': {
            'level': LOGGING_LEVEL,
            'class': 'logging.FileHandler',
            'filename': 'logs/ProductionLogs.log',
            'formatter': 'default',
        },
    }
