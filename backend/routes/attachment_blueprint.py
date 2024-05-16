import os

from models.models import db, Attachment, StaticAttachment, RestaurantAttachment
from models.responses import Response

from script.oauth_scripts import authorization_required

from flask import Blueprint, send_file
from config import Config
from pathlib import Path

attachment_blueprint = Blueprint('attachment', __name__)


@attachment_blueprint.route('/post/<int:attachment_id>', methods=['GET'])
def get_attachment(attachment_id):
    """
    Get attachment by id
    ---
    tags:
      - Attachment
    parameters:
      - name: attachment_id
        in: path
        type: integer
        required: true
        description: attachment id
    responses:
      200:
        description: get attachment successful
      404:
        description: attachment not found
    """
    attachment = Attachment.query.get(attachment_id)

    if attachment is None:
        return Response.not_found('attachment not found', 404)

    return send_file(attachment.file_path, download_name=attachment.name)


@attachment_blueprint.route('/post/<int:attachment_id>/info', methods=['GET'])
def get_attachment_info(attachment_id):
    """
    Get attachment info by id
    ---
    tags:
      - Attachment
    parameters:
      - name: attachment_id
        in: path
        type: integer
        required: true
        description: attachment id
    responses:
      200:
        description: get attachment info successful
      404:
        description: attachment not found
    """
    attachment = Attachment.query.get(attachment_id)

    if attachment is None:
        return Response.not_found('attachment not found', 404)
    payload = attachment.as_dict()
    payload['attachment_uri'] = f'/api/attachment/post/{attachment.id}'
    return Response.response('get attachment info successful', payload)


@attachment_blueprint.route('/post/<attachment_id>', methods=['DELETE'])
@authorization_required(2)
def delete_attachment(attachment_id):
    """
    Delete attachment by id
    ---
    tags:
      - Attachment
    parameters:
      - name: attachment_id
        in: path
        type: integer
        required: true
        description: attachment id
    security:
    - BearerAuth: []
    responses:
      200:
        description: delete attachment successful
      404:
        description: attachment not found
    """
    filepath = Path(Config.STATIC_POST_CONFIG['ATTACHMENT_DIR']) / Path(attachment_id)

    if not os.path.exists(filepath):
        return Response.response('delete attachment successful')

    os.remove(filepath)
    return Response.response('delete attachment successful')


@attachment_blueprint.route('/static_post/<attachment_id>/info', methods=['GET'])
def get_static_attachment_info(attachment_id):
    """
    Get attachment info by id
    ---
    tags:
      - Attachment
    parameters:
      - name: attachment_id
        in: path
        type: integer
        required: true
        description: attachment id
    responses:
      200:
        description: get attachment info successful
      404:
        description: attachment not found
    """
    if not os.path.exists(Path(Config.STATIC_POST_CONFIG['ATTACHMENT_DIR']) / Path(attachment_id)):
        return Response.not_found('attachment not found', 404)

    payload = {
        "attachment_uri": f"/api/attachment/static_post/{attachment_id}",
        "create_time": "1999-01-01T00:00:00.000000",
        "file_path": "",
        "id": attachment_id,
        "name": attachment_id.split('__')[-1],
        "post_id": "0",
        "update_time": "1999-01-01T00:00:00.000000"
    }
    return Response.response('get attachment info successful', payload)


@attachment_blueprint.route('/static_post/<attachment_id>', methods=['GET'])
def get_static_attachment(attachment_id):
    """
    Get static attachment by id
    ---
    tags:
      - Attachment
    parameters:
      - name: attachment_id
        in: path
        type: integer
        required: true
        description: attachment id
    responses:
      200:
        description: get attachment successful
      404:
        description: attachment not found
    """
    filepath = Path(Config.STATIC_POST_CONFIG['ATTACHMENT_DIR']) / Path(attachment_id)

    if not os.path.exists(filepath):
        return Response.not_found('attachment not found', 404)

    return send_file(filepath, download_name=filepath.name.split("__")[-1])


@attachment_blueprint.route('/static_post/<attachment_id>', methods=['DELETE'])
@authorization_required(2)
def delete_static_attachment(attachment_id):
    """
    Delete static attachment by id
    ---
    tags:
      - Attachment
    parameters:
      - name: attachment_id
        in: path
        type: string
        required: true
        description: attachment id
    security:
    - BearerAuth: []
    responses:
      200:
        description: delete attachment successful
      404:
        description: attachment not found
    """
    filepath = Path(Config.STATIC_POST_CONFIG['ATTACHMENT_DIR']) / Path(attachment_id)

    if not os.path.exists(filepath):
        return Response.response('delete attachment successful')
    os.remove(filepath)
    return Response.response('delete attachment successful')


@attachment_blueprint.route('/restaurant_post/<int:attachment_id>', methods=['GET'])
def get_restaurant_attachment(attachment_id):
    """
    Get restaurant_post attachment by id
    ---
    tags:
      - Attachment
    parameters:
      - name: attachment_id
        in: path
        type: integer
        required: true
        description: attachment id
    responses:
      200:
        description: get attachment successful
      404:
        description: attachment not found
    """
    attachment = RestaurantAttachment.query.get(attachment_id)

    if attachment is None:
        return Response.not_found('attachment not found', 404)

    return send_file(attachment.file_path, download_name=attachment.name)


@attachment_blueprint.route('/restaurant_post/<int:attachment_id>/info', methods=['GET'])
def get_restaurant_attachment_info(attachment_id):
    """
    Get restaurant_post attachment info by id
    ---
    tags:
      - Attachment
    parameters:
      - name: attachment_id
        in: path
        type: integer
        required: true
        description: attachment id
    responses:
      200:
        description: get attachment info successful
      404:
        description: attachment not found
    """
    attachment = RestaurantAttachment.query.get(attachment_id)

    if attachment is None:
        return Response.not_found('attachment not found', 404)

    payload = attachment.as_dict()
    payload['attachment_uri'] = f'/api/attachment/restaurant_post/{attachment.id}'
    return Response.response('get attachment info successful', payload)


@attachment_blueprint.route('/restaurant_post/<int:attachment_id>', methods=['DELETE'])
@authorization_required(2)
def delete_restaurant_attachment(attachment_id):
    """
    Delete restaurant_post attachment by id
    ---
    tags:
      - Attachment
    security:
    - BearerAuth: []
    parameters:
      - name: attachment_id
        in: path
        type: integer
        required: true
        description: attachment id
    responses:
      200:
        description: delete attachment successful
      404:
        description: attachment not found
    """
    attachment = RestaurantAttachment.query.get(attachment_id)

    if attachment is None:
        return Response.not_found('attachment not found', 404)

    os.remove(attachment.file_path)
    db.session.delete(attachment)
    db.session.commit()

    return Response.response('delete attachment successful')
