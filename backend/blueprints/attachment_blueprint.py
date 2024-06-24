import os

from helpers.CustomResponse import CustomResponse

from uuid import uuid4
from pathlib import Path

from models.attachment_model import Attachment, db
from flask import Blueprint, request, send_file, current_app

activity_blueprint = Blueprint('attachment', __name__)


@activity_blueprint.route('<int:id_>', methods=['GET'])
def get_attachment(id_):
    attachment = Attachment.query.get(id_)

    if attachment is None:
        return CustomResponse.not_found('attachment not found', '')

    return send_file(attachment.filepath, as_attachment=True, download_name=attachment.filename)


@activity_blueprint.route('<int:id_>/info', methods=['GET'])
def get_attachment_info(id_):
    attachment = Attachment.query.get(id_)

    if attachment is None:
        return CustomResponse.not_found('attachment not found', '')

    return CustomResponse.success('get attachment info success', attachment.to_dict())


@activity_blueprint.route('', methods=['POST'])
def post_attachment():
    file = request.files['file']
    file_name = file.filename

    new_file_name = f"{uuid4()}.{file_name.split('.')[-1]}"
    new_file_path = Path(current_app.config['ATTACHMENT_DIR']) / Path(new_file_name)
    file_name.save(new_file_path)

    attachment = Attachment(filename=file_name, filepath=str(new_file_path))
    db.session.add(attachment)
    db.session.commit()

    return CustomResponse.success('post attachment success', attachment.to_dict())


@activity_blueprint.route('<int:id_>', methods=['DELETE'])
def delete_attachment(id_):
    attachment = Attachment.query.get(id_)

    if attachment is None:
        return CustomResponse.not_found('attachment not found', '')

    os.remove(attachment.filepath)
    db.session.delete(attachment)
    db.session.commit()

    return CustomResponse.success('delete attachment success', attachment.to_dict())
