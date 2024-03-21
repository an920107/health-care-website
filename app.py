# -*- coding: utf-8 -*-

from config import Config

from models.models import db
from models.responses import Response

from routes.post_blueprint import post_blueprint
from routes.image_blueprint import image_blueprint
from routes.attachment_blueprint import attachment_blueprint
from routes.static_post_blueprint import static_post_blueprint
from routes.carousel_blueprint import carousel_blueprint
from routes.auth_blueprint import auth_blueprint
from routes.restaurant_post_blueprint import restaurant_post_blueprint

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

    app.config.from_mapping({
        'SQLALCHEMY_DATABASE_URI': 'sqlite:///health-care-website.db',
        'SWAGGER': {
            "title": "health-care-backend",
            "description": "Nation Central University Health Care Backend Development",
            "version": "2.0.0",
        }
    })

    db.init_app(app)
    swagger = Swagger(app)
    cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


    return app


app = create_app()
with app.app_context():
    # db.session.remove()
    # db.drop_all()
    db.create_all()


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
    app.run(debug=False, host="0.0.0.0", port=5001)
