import logging


class Config:
    LOGGING_FORMAT = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    ATTACHMENT_DIR = 'statics/attachments'
    IMAGE_DIR = 'statics/images'
    DOWNLOAD = 'statics/downloads'
    CAROUSEL = 'statics/carousels'
    LOGGING_LEVEL = logging.DEBUG
    PORT = 5004
    MAX_CONTENT_LENGTH = 500 * 1024 * 1024

    BASIC_AUTH = 'MjAyNDA1MjQwMDU0MTNjSDZFbjVSRlpjMzU6Y2pBODhodTFUMmlScXBydGVUeEZKT3JuMm05aGhRQk80RXhkZDNWUjNMUGN6NzFCdg=='
    REDIRECT_URL = 'https://health-care-dev.squidspirit.com/api/auth/login'
    HOME_PAGE_URL = 'https://health-dev.squidspirit.com/'


class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'sqlite:///development-database.db'
    LOGGING_HANDLERS = {
        'console': {
            'level': Config.LOGGING_LEVEL,
            'class': 'logging.StreamHandler',
            'formatter': 'default',
        },
    }
