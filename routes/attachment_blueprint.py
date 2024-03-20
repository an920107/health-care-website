import os

from models.models import db, Attachment, StaticAttachment, RestaurantAttachment
from models.responses import Response

from flask import Blueprint, send_file

attachment_blueprint = Blueprint('attachment', __name__)


@attachment_blueprint.route('/<int:attachment_id>', methods=['GET'])
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

    return send_file(attachment.file_path)


@attachment_blueprint.route('/<int:attachment_id>/info', methods=['GET'])
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

    return Response.response('get attachment info successful', attachment.as_dict())


@attachment_blueprint.route('/<int:attachment_id>', methods=['DELETE'])
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
    responses:
      200:
        description: delete attachment successful
      404:
        description: attachment not found
    """
    attachment = Attachment.query.get(attachment_id)

    if attachment is None:
        return Response.not_found('attachment not found', 404)

    os.remove(attachment.file_path)
    db.session.delete(attachment)
    db.session.commit()

    return Response.response('delete attachment successful')


@attachment_blueprint.route('/static/<int:attachment_id>', methods=['GET'])
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
    attachment = StaticAttachment.query.get(attachment_id)

    if attachment is None:
        return Response.not_found('attachment not found', 404)

    return send_file(attachment.file_path)


@attachment_blueprint.route('/static/<int:attachment_id>/info', methods=['GET'])
def get_static_attachment_info(attachment_id):
    """
    Get static attachment info by id
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
    attachment = StaticAttachment.query.get(attachment_id)

    if attachment is None:
        return Response.not_found('attachment not found', 404)

    return Response.response('get attachment info successful', attachment.as_dict())


@attachment_blueprint.route('/static/<int:attachment_id>', methods=['DELETE'])
def delete_static_attachment(attachment_id):
    """
    Delete static attachment by id
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
        description: delete attachment successful
      404:
        description: attachment not found
    """
    attachment = StaticAttachment.query.get(attachment_id)

    if attachment is None:
        return Response.not_found('attachment not found', 404)

    os.remove(attachment.file_path)
    db.session.delete(attachment)
    db.session.commit()

    return Response.response('delete attachment successful')


@attachment_blueprint.route('/restaurant/<int:attachment_id>', methods=['GET'])
def get_restaurant_attachment(attachment_id):
    """
    Get restaurant attachment by id
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

    return send_file(attachment.file_path)


@attachment_blueprint.route('/restaurant/<int:attachment_id>/info', methods=['GET'])
def get_restaurant_attachment_info(attachment_id):
    """
    Get restaurant attachment info by id
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

    return Response.response('get attachment info successful', attachment.as_dict())


@attachment_blueprint.route('/restaurant/<int:attachment_id>', methods=['DELETE'])
def delete_restaurant_attachment(attachment_id):
    """
    Delete restaurant attachment by id
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
