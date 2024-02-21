# -*- coding: utf-8 -*-
from package.response import Response

from flasgger import Swagger
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
app.config['SWAGGER'] = {
    "title": "health-care-website-backend",
    "description": "中央大學衛生保健組 後端開發",
}
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
swagger = Swagger(app)


@app.route("/api/")
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
    app.run(debug=True, host="0.0.0.0", port=5000)
