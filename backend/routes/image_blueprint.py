from models.models import Image, StaticImage
from models.responses import Response

from flask import Blueprint, send_file

image_blueprint = Blueprint('image', __name__)


@image_blueprint.route('/<int:image_id>', methods=['GET'])
def get_image(image_id):
    """
    Get image by image_id
    ---
    tags:
      - Image
    parameters:
      - name: image_id
        in: path
        type: integer
        required: true
        description: image id
    responses:
      200:
        description: image
      404:
        description: image not found
    """
    image = Image.query.get(image_id)
    if image is None:
        Response.not_found('image not found', 404)
    return send_file(image.file_path)


@image_blueprint.route('/static/<int:image_id>', methods=['GET'])
def get_static_image(image_id):
    """
    Get static image by image_id
    ---
    tags:
      - Image
    parameters:
      - name: image_id
        in: path
        type: integer
        required: true
        description: image id
    responses:
      200:
        description: image
      404:
        description: image not found
    """
    image = StaticImage.query.get(image_id)
    if image is None:
        Response.not_found('image not found', 404)
    return send_file(image.file_path)
