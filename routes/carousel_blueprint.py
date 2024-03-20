import os

from pathlib import Path
from config import Config

from models.models import db, Carousel
from models.responses import Response

from flask import Blueprint, request, send_file

carousel_blueprint = Blueprint('carousel', __name__)


@carousel_blueprint.route('/<int:carousel_id>', methods=['GET'])
def get_carousel(carousel_id):
    """
    Get carousel
    ---
    tags:
      - Carousel
    parameters:
      - name: carousel_id
        in: path
        type: integer
        required: true
        description: carousel id
    responses:
      200:
        description: get carousel successful
      404:
        description: carousel not found
    """
    carousel = Carousel.query.get(carousel_id)
    if carousel is None:
        return Response.not_found('carousel not found')

    return send_file(carousel.file_path)


@carousel_blueprint.route('/', methods=['GET'])
def get_carousels():
    """
    Get all carousels
    ---
    tags:
      - Carousel
    responses:
      200:
        description: get carousels successful
      404:
        description: carousels not found
    """
    carousels = Carousel.query.all()
    if not carousels:
        return Response.not_found('carousels not found')

    payload = []
    for carousel in carousels:
        payload.append({
            'id': carousel.id,
            'name': carousel.name,
            'carousel_url': f'/api/carousels/{carousel.id}'
        })

    return Response.response('get carousels successful', payload)


@carousel_blueprint.route('/', methods=['POST'])
def upload_carousel():
    """
    Upload carousel
    ---
    tags:
      - Carousel
    parameters:
      - name: carousel
        in: formData
        type: file
        required: true
        description: The carousel image to upload
    responses:
      200:
        description: upload carousel successful
    """
    file = request.files['carousel']
    if file is None:
        return Response.client_error('no file part')

    file_path = Path(Config.CAROUSEL_CONFIG['IMAGE_DIR']) / Path(file.filename)
    file.save(file_path)

    carousel = Carousel(name=file.filename, file_path=file_path)
    db.session.add(carousel)
    db.session.commit()

    return Response.response('upload carousel successful')


@carousel_blueprint.route('/<int:carousel_id>', methods=['DELETE'])
def delete_carousel(carousel_id):
    """
    Delete carousel
    ---
    tags:
      - Carousel
    parameters:
      - name: carousel_id
        in: path
        type: integer
        required: true
        description: carousel id
    responses:
      200:
        description: delete carousel successful
      404:
        description: carousel not found
    """
    carousel = Carousel.query.get(carousel_id)
    if carousel is None:
        return Response.not_found('carousel not found')

    os.remove(carousel.file_path)
    db.session.delete(carousel)
    db.session.commit()

    return Response.response('delete carousel successful')
