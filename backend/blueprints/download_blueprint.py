import os
from uuid import uuid4
from pathlib import Path

from helpers.CustomResponse import CustomResponse

from models.download_model import Download, db
from flask import Blueprint, request, send_file, current_app

download_blueprint = Blueprint('download', __name__)


@download_blueprint.route('', methods=['GET'])
def get_downloads():
    """
    get all downloads
    ---
    tags:
      - download
    parameters:
      - in: query
        name: column
        schema:
        type: string
        description: column name
      - in: query
        name: visibility
        schema:
        type: boolean
        description: visibility
    responses:
      200:
        description: get downloads success
        schema:
          id: DownloadQuery
    """
    downloads = db.session.query(Download)

    if "column" in request.args:
        downloads = downloads.filter(Download.column == request.args["column"])
    if "visibility" in request.args:
        downloads = downloads.filter(Download.visibility == bool(request.args["visibility"]))

    downloads = [download.to_dict() for download in downloads.all()]

    return CustomResponse.success("get downloads success", downloads)


@download_blueprint.route('<int:id_>', methods=['GET'])
def get_download(id_):
    """
    get download by id
    ---
    tags:
      - download
    parameters:
      - in: path
        name: id_
        type: integer
        required: true
    """
    download = Download.query.get(id_)

    if download is None:
        return CustomResponse.not_found("Download not found", {})

    return send_file(download.filepath, as_attachment=True, download_name=download.title)


@download_blueprint.route('<int:id_>/info', methods=['GET'])
def get_download_info(id_):
    """
    get download info by id
    ---
    tags:
      - download
    parameters:
      - in: path
        name: id_
        type: integer
        required: true
    responses:
      200:
        description: get download info success
        schema:
          id: Download
      404:
        description: download not found
        schema:
          id: NotFound
    """
    download = Download.query.get(id_)

    if download is None:
        return CustomResponse.not_found("Download not found", {})
    download.viewer += 1
    db.session.commit()

    return CustomResponse.success("get download info success", download.to_dict())


@download_blueprint.route('', methods=['POST'])
def post_attachment():
    """
    post download
    ---
    tags:
      - download
    parameters:
      - name: title
        in: formData
        type: string
        required: true
      - name: title_en
        in: formData
        type: string
        required: true
      - name: column
        in: formData
        type: string
        required: true
      - name: visibility
        in: formData
        type: boolean
        required: true
      - name: file
        in: formData
        type: file
        required: true
    responses:
      201:
        description: post download success
        schema:
          id: Download
      422:
        description: unprocessable content
        schema:
          id: UnprocessableContent
    """
    if "title" not in request.form:
        return CustomResponse.unprocessable_content("Title is required", {})
    if "title_en" not in request.form:
        return CustomResponse.unprocessable_content("Title is required", {})
    if "column" not in request.form:
        return CustomResponse.unprocessable_content("Content is required", {})
    if "visibility" not in request.form:
        return CustomResponse.unprocessable_content("Visible is required", {})
    if "file" not in request.files:
        return CustomResponse.unprocessable_content("File is required", {})

    try:
        title = request.form["title"]
        title_en = request.form["title_en"]
        column = request.form["column"]
        visibility = bool(request.form["visibility"])
        file = request.files['file']
    except Exception as e:
        return CustomResponse.unprocessable_content("Invalid data type", {})

    file_name = file.filename
    new_file_name = f"{uuid4()}.{file_name.split('.')[-1]}"
    new_file_path = Path(current_app.config['DOWNLOAD']) / Path(new_file_name)
    file.save(new_file_path)

    download = Download(
        title=title,
        title_en=title_en,
        column=column,
        visibility=visibility,
        filepath=str(new_file_path)
    )
    db.session.add(download)
    db.session.commit()

    return CustomResponse.created('post download success', download.to_dict())


@download_blueprint.route('<int:id_>', methods=['PATCH'])
def patch_download(id_):
    """
    patch download
    ---
    tags:
      - download
    parameters:
      - name: id_
        in: path
        type: integer
        required: true
      - in: body
        name: json
        schema:
        id: DownloadInput
    responses:
      204:
        description: patch download success
        schema:
          id: Download
      404:
        description: download not found
        schema:
          id: NotFound
    """
    download = db.session.query(Download).get(id_)
    if download is None:
        return CustomResponse.not_found("Download not found", {})

    if 'title' in request.json:
        download.title = request.json['title']
    if 'title_en' in request.json:
        download.title_en = request.json['title_en']
    if 'column' in request.json:
        download.column = request.json['column']
    if 'visibility' in request.json:
        download.visibility = bool(request.json['visibility'])
    if "file" in request.files:
        file = request.files['file']
        file_name = file.filename
        new_file_name = f"{uuid4()}.{file_name.split('.')[-1]}"
        new_file_path = Path(current_app.config['DOWNLOAD']) / Path(new_file_name)
        file.save(new_file_path)

        os.remove(download.filepath)
        download.filepath = str(new_file_path)

    db.session.commit()
    return CustomResponse.no_content("patch download success", {})


@download_blueprint.route('<int:id_>', methods=['DELETE'])
def delete_download(id_):
    """
    delete download
    ---
    tags:
      - download
    parameters:
      - name: id_
        in: path
        type: integer
        required: true
    responses:
      204:
        description: delete download success
      404:
        description: download not found
        schema:
          id: NotFound
    """
    download = Download.query.get(id_)

    if download is None:
        return CustomResponse.not_found("Download not found", {})

    os.remove(download.filepath)
    db.session.delete(download)
    db.session.commit()

    return CustomResponse.no_content("delete download success", {})
