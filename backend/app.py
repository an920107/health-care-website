# -*- coding: utf-8 -*-

from posts.routes import *

from package.response import Response

from flask import Flask, request, send_file
from flask_cors import CORS
from flasgger import Swagger

app = Flask(__name__)
app.register_blueprint(posts_blueprints, url_prefix='/api/posts')

app.config['SWAGGER'] = {
    "title": "health-care-website-backend",
    "description": "中央大學衛生保健組 後端開發",
}
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///health-care-website.db"

db.init_app(app)

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

swagger = Swagger(app)
with app.app_context():
    db.session.remove()
    db.drop_all()
    db.create_all()


@app.errorhandler(Exception)
def handle_exception(e: Exception):
    app.logger.error(e)
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
