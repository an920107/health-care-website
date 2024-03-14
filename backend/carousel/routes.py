import os
import uuid
from pathlib import Path
from package.response import *
from package.database_operator import *
from flask import Blueprint, request, send_file

carousels_blueprints = Blueprint('carousel', __name__)

CAROUSELS_CONFIG = {
    'CAROUSEL_DIR': './carousel/images',
}


@carousels_blueprints.route('/carousel', methods=['GET'])
def get_carousel():
    """
    Get carousel
    ---
    tags:
      - carousel
    parameters:
      - in: query
        name: carousel_id
        required: false
    responses:
      200:
        description: get carousel success
      404:
        description: carousel not found
    """
    if 'carousel_id' in request.args:
        carousel = DatabaseOperator.select_one(Carousel, {'id': request.args['carousel_id']})
        if carousel is None:
            return Response.not_found('carousel not found')
        return send_file(carousel.file_path)

    payload = []
    carousels = DatabaseOperator.select_all(Carousel)
    for carousel in carousels:
        payload.append({
            'id': carousel.id,
            'name': carousel.name,
            'endpoint': f'/api/carousels/carousel?carousel_id={carousel.id}'
        })

    return Response.response('get carousel success', payload)


@carousels_blueprints.route('/carousel', methods=['POST'])
def post_carousel():
    """
    Post carousel
    ---
    tags:
      - carousel
    parameters:
      - name: blob_carousel
        in: formData
        type: file
        required: true
        description: The carousel image to upload
    responses:
      200:
        description: post carousel success
      400:
        description: no blob carousel
    """
    if 'blob_carousel' not in request.files:
        return Response.client_error('no blob carousel')

    blob_attachment = request.files['blob_carousel']
    new_attachment_id = uuid.uuid4()

    new_attachment_name = Path(f"{new_attachment_id}.{blob_attachment.filename.split('.')[-1]}")
    new_attachment_dir = Path(CAROUSELS_CONFIG['CAROUSEL_DIR'])

    blob_attachment.save(new_attachment_dir / new_attachment_name)
    DatabaseOperator.insert(Carousel, {
        'id': str(new_attachment_id),
        'name': blob_attachment.name,
        'file_path': str(new_attachment_dir / new_attachment_name)
    })

    return Response.response('post carousel success', {'carousel_id': new_attachment_id})


@carousels_blueprints.route('/carousel', methods=['DELETE'])
def delete_carousel():
    """
    Delete carousel
    ---
    tags:
      - carousel
    parameters:
      - in: query
        name: carousel_id
        schema:
        type: string
        description: carousel id
    responses:
      200:
        description: delete carousel success
      400:
        description: no carousel id in args
    """
    if 'carousel_id' not in request.args:
        return Response.client_error('no carousel id in args')

    carousel = DatabaseOperator.select_one(Carousel, {'id': request.args['carousel_id']})
    if carousel is None:
        return Response.response('delete carousel success')

    DatabaseOperator.delete(Carousel, {'id': request.args['carousel_id']})
    os.remove(carousel.file_path)
    return Response.response('delete carousel success')


"""
        Get carousel
        ---
        tags:
          - carousel
        parameters:
          - in: query
            name: carousel_id
            required: true
        responses:
          200:
            description: get carousel success
          404:
            description: carousel not found
        """
"""
    Post carousel
    ---
    tags:
      - carousel
    parameters:
      name: blob_image
      in: formData
      required: true
    responses:
      200:
        description: post carousel success
      400:
        description: no blob carousel
"""
"""
    Delete carousel
    ---
    tags:
      - carousel
    parameters:
      - in: query
        name: carousel_id
        schema:
        type: string
        description: carousel id
    responses:
      200:
        description: delete carousel success
      400:
        description: no carousel id in args
    """
