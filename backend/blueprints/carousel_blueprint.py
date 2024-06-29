import os
from uuid import uuid4
from pathlib import Path

from helpers.CustomResponse import CustomResponse

from models.carousel_model import Carousel, db
from flask import Blueprint, request, send_file, current_app

carousel_blueprint = Blueprint('carousel', __name__)


@carousel_blueprint.route('', methods=['GET'])
def get_carousels():
    """
    get carousels
    ---
    tags:
      - carousel
    responses:
      200:
        description: get carousels success
    """
    carousels = Carousel.query.all()
    return CustomResponse.success("get carousels success", [carousel.to_dict() for carousel in carousels])


@carousel_blueprint.route('<int:id_>/info', methods=['GET'])
def get_carousel_info(id_):
    """
    get carousel info
    ---
    tags:
      - carousel
    parameters:
      - name: id_
        in: path
        type: integer
        required: true
    responses:
      200:
        description: get carousels success
        schema:
          id: CarouselInfo
      404:
        description: carousel not found
        schema:
          $ref: '#/definitions/NotFound'
    """
    carousel = Carousel.query.get(id_)

    if carousel is None:
        return CustomResponse.not_found("Carousel not found", {})

    return CustomResponse.success("get carousel info success", carousel.to_dict())


@carousel_blueprint.route('<int:id_>', methods=['GET'])
def get_carousel(id_):
    """
    get carousel
    ---
    tags:
      - carousel
    parameters:
      - name: id_
        in: path
        type: integer
        required: true
    responses:
      200:
        description: get carousels success
      404:
        description: carousel not found
        schema:
          $ref: '#/definitions/NotFound'
    """
    carousel = Carousel.query.get(id_)

    if carousel is None:
        return CustomResponse.not_found("Carousel not found", {})

    return send_file(carousel.filepath)


@carousel_blueprint.route('', methods=['POST'])
def post_carousel():
    """
    post carousel
    ---
    tags:
      - carousel
    parameters:
      - name: title
        in: formData
        type: string
        required: true
      - name: content
        in: formData
        type: string
        required: true
      - name: visibility
        in: formData
        type: boolean
        required: true
      - name: image
        in: formData
        type: file
        required: true
    responses:
      200:
        description: get carousels success
      422:
        description: unprocessable content
        schema:
          $ref: '#/definitions/UnprocessableContent'
    """
    if "title" not in request.form:
        return CustomResponse.unprocessable_content("Title is required", {})
    if "content" not in request.form:
        return CustomResponse.unprocessable_content("Content is required", {})
    if "visibility" not in request.form:
        return CustomResponse.unprocessable_content("Visible is required", {})
    if "image" not in request.files:
        return CustomResponse.unprocessable_content("Image is required", {})

    try:
        title = request.form["title"]
        content = request.form["content"]
        visibility = bool(request.form["visibility"])
        image = request.files['image']
    except Exception as e:
        return CustomResponse.unprocessable_content("Invalid data type", {})

    file_name = image.filename
    new_file_name = f"{uuid4()}.{file_name.split('.')[-1]}"
    new_file_path = Path(current_app.config['CAROUSEL']) / Path(new_file_name)
    image.save(new_file_path)

    carousel = Carousel(
        title=title,
        content=content,
        visibility=visibility,
        filepath=str(new_file_path)
    )
    db.session.add(carousel)
    db.session.commit()

    return CustomResponse.created('post carousel success', carousel.to_dict())


@carousel_blueprint.route('<int:id_>', methods=['PUT'])
def put_carousel(id_):
    """
    put carousel
    ---
    tags:
      - carousel
    parameters:
      - name: id_
        in: path
        type: integer
        required: true
      - name: title
        in: formData
        type: string
      - name: content
        in: formData
        type: string
      - name: visibility
        in: formData
        type: boolean
      - name: image
        in: formData
        type: file
    responses:
      200:
        description: get carousels success
      404:
        description: carousel not found
        schema:
          $ref: '#/definitions/NotFound'
      422:
        description: unprocessable content
        schema:
          $ref: '#/definitions/UnprocessableContent'
    """
    carousel = Carousel.query.get(id_)

    if carousel is None:
        return CustomResponse.not_found("Carousel not found", {})

    try:
        if "title" in request.form:
            carousel.title = request.form["title"]
        if "content" in request.form:
            carousel.content = request.form["content"]
        if "visibility" in request.form:
            carousel.visibility = bool(request.form["visibility"])
        if "image" in request.files:
            os.remove(carousel.filepath)

            image = request.files['image']
            file_name = image.filename
            new_file_name = f"{uuid4()}.{file_name.split('.')[-1]}"
            new_file_path = Path(current_app.config['CAROUSEL']) / Path(new_file_name)
            image.save(new_file_path)
            carousel.filepath = str(new_file_path)
    except Exception as e:
        return CustomResponse.unprocessable_content("Invalid data type", {})

    db.session.commit()
    return CustomResponse.no_content('put carousel success', carousel.to_dict())


@carousel_blueprint.route('<int:id_>', methods=['DELETE'])
def delete_carousel(id_):
    """
    put carousel
    ---
    tags:
      - carousel
    parameters:
      - name: id_
        in: path
        type: integer
        required: true
    responses:
      200:
        description: get carousels success
      404:
        description: carousel not found
        schema:
          $ref: '#/definitions/NotFound'
    """

    carousel = Carousel.query.get(id_)

    if carousel is None:
        return CustomResponse.not_found("Carousel not found", {})

    os.remove(carousel.filepath)
    db.session.delete(carousel)
    db.session.commit()

    return CustomResponse.no_content('delete carousel success', {})
