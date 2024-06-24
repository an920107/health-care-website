import logging


class Config:
    LOGGING_FORMAT = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///database.db'


class DevelopmentConfig(Config):
    LOGGING_FILENAME = 'static/DevelopmentLogs.log'
    LOGGING_LEVEL = logging.DEBUG


class TestingConfig(Config):
    LOGGING_FILENAME = 'static/TestingLogs.log'
    LOGGING_LEVEL = logging.DEBUG


class ProductionConfig(Config):
    LOGGING_FILENAME = 'static/ProductionLogs.log'
    LOGGING_LEVEL = logging.ERROR
