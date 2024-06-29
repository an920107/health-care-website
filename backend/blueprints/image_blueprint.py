import os
from uuid import uuid4
from pathlib import Path

from helpers.CustomResponse import CustomResponse

from models.image_model import Image, db
from flask import Blueprint, request, send_file, current_app

image_blueprint = Blueprint('image', __name__)


@image_blueprint.route('<int:id_>', methods=['GET'])
def get_image(id_):
    """
    get image
    ---
    tags:
      - image
    parameters:
      - in: path
        name: id_
        required: true
        schema:
          type: integer
    responses:
      200:
        description: get image success
      404:
        description: image not found
        schema:
          $ref: '#/definitions/NotFound'
    """
    image = Image.query.get(id_)

    if image is None:
        return CustomResponse.not_found('image not found', '')

    return send_file(image.filepath)


@image_blueprint.route('', methods=['POST'])
def post_image():
    """
    post image
    ---
    tags:
      - image
    parameters:
      - in: formData
        name: image
        type: file
        required: true
    responses:
      201:
        description: created attachment success
        schema:
          id: ImageInfo
      404:
        description: image not found
        schema:
          $ref: '#/definitions/NotFound'
    """
    image = request.files['image']
    file_name = image.filename

    new_file_name = f"{uuid4()}.{file_name.split('.')[-1]}"
    new_file_path = Path(current_app.config['IMAGE_DIR']) / Path(new_file_name)
    image.save(new_file_path)

    image = Image(filename=file_name, filepath=str(new_file_path))
    db.session.add(image)
    db.session.commit()

    return CustomResponse.created('post image success', image.to_dict())


@image_blueprint.route('<int:id_>', methods=['DELETE'])
def delete_image(id_):
    """
    delete image
    ---
    tags:
      - image
    parameters:
      - in: path
        name: id_
        required: true
        schema:
          type: integer
    responses:
      204:
        description: created attachment success
        schema:
          id: ImageInfo
      404:
        description: image not found
        schema:
          $ref: '#/definitions/NotFound'
    """
    attachment = Image.query.get(id_)

    if attachment is None:
        return CustomResponse.not_found('image not found', '')

    os.remove(attachment.filepath)
    db.session.delete(attachment)
    db.session.commit()

    return CustomResponse.no_content('delete image success', attachment.to_dict())
