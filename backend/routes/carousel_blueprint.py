import os
import uuid

from pathlib import Path
from config import Config

from models.models import db, Carousel
from models.responses import Response

from flask import Blueprint, request, send_file

from script.oauth_scripts import authorization_required

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


@carousel_blueprint.route('', methods=['GET'])
def get_carousels():
    """
    Get all carousels
    ---
    tags:
      - Carousel
    responses:
      200:
        description: get carousels successful
    """
    carousels = Carousel.query.all()

    payload = []
    for carousel in carousels:
        payload.append({
            'id': str(carousel.id),
            'name': carousel.name,
            'carousel_uri': f'/api/carousel/{carousel.id}'
        })

    return Response.response('get carousels successful', payload)


@carousel_blueprint.route('', methods=['POST'])
@authorization_required(2)
def upload_carousel():
    """
    Upload carousel
    ---
    tags:
      - Carousel
    security:
    - BearerAuth: []
    parameters:
      - name: blob_attachment
        in: formData
        type: file
        required: true
        description: The carousel image to upload
    responses:
      200:
        description: upload carousel successful
    """
    file = request.files['blob_attachment']
    if file is None:
        return Response.client_error('no file part')


    file_path = Path(Config.CAROUSEL_CONFIG['IMAGE_DIR']) / Path(str(uuid.uuid4()) + '.' + file.filename.split('.')[-1])
    file.save(file_path)

    carousel = Carousel(name=file.filename, file_path=str(file_path))
    db.session.add(carousel)
    db.session.commit()

    return Response.response('upload carousel successful')


@carousel_blueprint.route('/<int:carousel_id>', methods=['DELETE'])
@authorization_required(2)
def delete_carousel(carousel_id):
    """
    Delete carousel
    ---
    tags:
      - Carousel
    security:
    - BearerAuth: []
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
