# -*- coding: utf-8 -*-
import logging
import os.path
from logging.handlers import TimedRotatingFileHandler

from posts.routes import *
from auth.routes import *

from package.response import Response

from script.oauth_scripts import *

from flask_jwt_extended import JWTManager
from flask import Flask, request, send_file, redirect
from flask_cors import CORS
from flasgger import Swagger


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///health-care-website.db"
    app.config['SWAGGER'] = {
        "title": "health-care-website-backend",
        "description": "中央大學衛生保健組 後端開發",
    }
    app.config['JWT_SECRET_KEY'] = 'fhsahfkjdhfkjasgfg'
    app.config['PORT'] = 5001
    app.config['HOST'] = '0.0.0.0'

    db.init_app(app)

    # flasgger
    swagger = Swagger(app)

    # blueprint
    app.register_blueprint(posts_blueprints, url_prefix='/api/posts')
    app.register_blueprint(auth_blueprints, url_prefix='/api/auth')

    handler = TimedRotatingFileHandler('logging/flask-error.log', when='midnight', interval=1, backupCount=7)
    handler.setLevel(logging.INFO)
    formatter = logging.Formatter('%(asctime)s - %(levelname)s - IP: %(ip)s - Route: %(route)s - Message: %(message)s')
    handler.setFormatter(formatter)
    app.logger.addHandler(handler)

    # db and jwt
    with app.app_context():
        db.session.remove()
        db.drop_all()
        db.create_all()
        jwt = JWTManager(current_app)

    # CORS
    cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

    return app



app = create_app()


@app.errorhandler(Exception)
def handle_exception(e: Exception):
    ip = request.remote_addr if request else 'unknown'
    route = request.url_rule.rule if request.url_rule else 'unknown'
    app.logger.error(f"An exception occurred: {str(e)}", extra={'ip': ip, 'route': route})
    return Response.sever_error("sever error", str(e))


@app.route("/", methods=['GET'])
def test_connection():
    """
    Test API Connection.
    ---
    tags:
      - Testing
    responses:
      200:
        description: Connection successful.
    """
    return Response.response('connect success')


if __name__ == '__main__':
    if not os.path.exists('logging'):
        os.mkdir('logging')

    if not os.path.exists('posts/uploads'):
        os.mkdir('posts/uploads')
        os.mkdir('posts/uploads/images')
        os.mkdir('posts/uploads/attachments')

    app.run(debug=True, host="0.0.0.0", port=5001)
