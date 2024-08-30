import os
from uuid import uuid4
from pathlib import Path

from helpers.CustomResponse import CustomResponse

from models.attachment_model import Attachment, db
from flask import Blueprint, request, send_file, current_app

from helpers.auth_helpers import authorization_required

attachment_blueprint = Blueprint('attachment', __name__)


@attachment_blueprint.route('<int:id_>', methods=['GET'])
def get_attachment(id_):
    """
    get attachment
    ---
    tags:
      - attachment
    parameters:
      - in: path
        name: id_
        required: true
        schema:
        type: integer
    responses:
      200:
        description: get attachment success
      404:
        description: attachment not found
        schema:
          $ref: '#/definitions/NotFound'
    """
    attachment = Attachment.query.get(id_)

    if attachment is None:
        return CustomResponse.not_found('attachment not found', '')

    return send_file(attachment.filepath, as_attachment=True, download_name=attachment.filename)


@attachment_blueprint.route('<int:id_>/info', methods=['GET'])
def get_attachment_info(id_):
    """
    get attachment info
    ---
    tags:
      - attachment
    parameters:
      - in: path
        name: id_
        required: true
        schema:
          type: integer
    responses:
      200:
        description: get attachment info success
        schema:
          id: AttachmentInfo
      404:
        description: attachment not found
        schema:
          $ref: '#/definitions/NotFound'
    """
    attachment = Attachment.query.get(id_)

    if attachment is None:
        return CustomResponse.not_found('attachment not found', '')

    return CustomResponse.success('get attachment info success', attachment.to_dict())


@attachment_blueprint.route('', methods=['POST'])
@authorization_required([0, 1, 2])
def post_attachment():
    """
    post attachment info
    ---
    tags:
      - attachment
    parameters:
      - in: formData
        name: file
        type: file
        required: true
    responses:
      201:
        description: created attachment success
        schema:
          id: AttachmentInfo
      404:
        description: attachment not found
        schema:
          $ref: '#/definitions/NotFound'
    """
    file = request.files['file']
    file_name = file.filename

    new_file_name = f"{uuid4()}.{file_name.split('.')[-1]}"
    new_file_path = Path(current_app.config['ATTACHMENT_DIR']) / Path(new_file_name)
    file.save(new_file_path)

    attachment = Attachment(filename=file_name, filepath=str(new_file_path))
    db.session.add(attachment)
    db.session.commit()

    return CustomResponse.created('post attachment success', attachment.to_dict())


@attachment_blueprint.route('<int:id_>', methods=['DELETE'])
@authorization_required([0, 1, 2])
def delete_attachment(id_):
    """
    delete attachment info
    ---
    tags:
      - attachment
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
          id: AttachmentInfo
      404:
        description: attachment not found
        schema:
          $ref: '#/definitions/NotFound'
    """
    attachment = Attachment.query.get(id_)

    if attachment is None:
        return CustomResponse.not_found('attachment not found', '')

    os.remove(attachment.filepath)
    db.session.delete(attachment)
    db.session.commit()

    return CustomResponse.no_content('delete attachment success', attachment.to_dict())
