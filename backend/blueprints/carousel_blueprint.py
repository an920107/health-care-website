import os
from uuid import uuid4
from pathlib import Path

from helpers.CustomResponse import CustomResponse

from helpers.auth_helpers import authorization_required
from models.carousel_model import Carousel, db
from flask import Blueprint, request, send_file, current_app
from sqlalchemy import desc, or_

carousel_blueprint = Blueprint('carousel', __name__)


@carousel_blueprint.route('', methods=['GET'])
def get_carousels():
    """
    get carousels
    ---
    tags:
      - carousel
    parameters:
      - in: query
        name: search
        type: string
        required: false
      - in: query
        name: visibility
        type: boolean
        required: false
    responses:
      200:
        description: get carousels success
    """
    carousels = db.session.query(Carousel)

    if "visibility" in request.args:
        carousels = carousels.filter(
            Carousel.visibility == (False if request.args['visibility'] == 'false' else True)
        )

    if "search" in request.args:
        carousels = carousels.filter(
            or_(*[Carousel.title.like(f'%{term}%') for term in request.args['search'].split('+')]))

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

    carousel.viewer += 1
    db.session.commit()

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
@authorization_required([0, 1, 2])
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
      - name: title_en
        in: formData
        type: string
        required: true
      - name: content
        in: formData
        type: string
        required: true
      - name: content_en
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
          id: UnprocessableContent
    """
    if "title" not in request.form:
        return CustomResponse.unprocessable_content("Title is required", {})
    if "title_en" not in request.form:
        return CustomResponse.unprocessable_content("Title_en is required", {})
    if "content" not in request.form:
        return CustomResponse.unprocessable_content("Content is required", {})
    if "content_en" not in request.form:
        return CustomResponse.unprocessable_content("Content_en is required", {})
    if "visibility" not in request.form:
        return CustomResponse.unprocessable_content("Visible is required", {})
    if "image" not in request.files:
        return CustomResponse.unprocessable_content("Image is required", {})

    try:
        title = request.form["title"]
        title_en = request.form["title_en"]
        content = request.form["content"]
        content_en = request.form["content_en"]
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
        title_en=title_en,
        content=content,
        content_en=content_en,
        visibility=visibility,
        filepath=str(new_file_path)
    )
    db.session.add(carousel)
    db.session.commit()

    return CustomResponse.created('post carousel success', carousel.to_dict())


@carousel_blueprint.route('<int:id_>', methods=['PATCH'])
@authorization_required([0, 1, 2])
def patch_carousel(id_):
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
      - in: body
        name: json
        schema:
          id: CarouselInput
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
        if "title" in request.json:
            carousel.title = request.json["title"]
        if "title_en" in request.json:
            carousel.title_en = request.json["title_en"]
        if "content" in request.json:
            carousel.content = request.json["content"]
        if "content_en" in request.json:
            carousel.content_en = request.json["content_en"]
        if "visibility" in request.json:
            carousel.visibility = bool(request.json["visibility"])

    except Exception as e:
        return CustomResponse.unprocessable_content("Invalid data type", {})

    db.session.commit()
    return CustomResponse.no_content('put carousel success', carousel.to_dict())


@carousel_blueprint.route('<int:id_>', methods=['DELETE'])
@authorization_required([0, 1, 2])
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
