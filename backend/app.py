# -*- coding: utf-8 -*-
import logging
import os.path
from logging.handlers import TimedRotatingFileHandler

from posts.routes import *

from package.response import Response

from flask import Flask, request, send_file
from flask_cors import CORS
from flasgger import Swagger

app = Flask(__name__)

# CORS
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

# blueprint
app.register_blueprint(posts_blueprints, url_prefix='/api/posts')

# SQLALCHEMY
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///health-care-website.db"
db.init_app(app)
with app.app_context():
    db.session.remove()
    db.drop_all()
    db.create_all()

# flasgger
app.config['SWAGGER'] = {
    "title": "health-care-website-backend",
    "description": "中央大學衛生保健組 後端開發",
}
swagger = Swagger(app)

# logging
if not os.path.exists('logging'):
    os.mkdir('logging')
handler = TimedRotatingFileHandler('logging/flask-error.log', when='midnight', interval=1, backupCount=7)
handler.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s - %(levelname)s - IP: %(ip)s - Route: %(route)s - Message: %(message)s')
handler.setFormatter(formatter)
app.logger.addHandler(handler)


@app.errorhandler(Exception)
def handle_exception(e: Exception):
    ip = request.remote_addr if request else 'unknown'
    route = request.url_rule.rule if request.url_rule else 'unknown'
    app.logger.error(f"An exception occurred: {str(e)}", extra={'ip': ip, 'route': route})
    return Response.sever_error("sever error", str(e))


@app.route("/api/", methods=['GET'])
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
    app.run(debug=False, host="0.0.0.0", port=5000)
