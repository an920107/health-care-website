import os
import uuid
from pathlib import Path
from config import Config

from script.utils import api_input_check, api_input_get

from models.models import StaticPost, db, StaticImage, StaticAttachment
from models.responses import Response

from flask import Blueprint, request

static_post_blueprint = Blueprint('static_post', __name__)


@static_post_blueprint.route('/<static_post_name>', methods=['GET'])
def get_static_post(static_post_name):
    """
    Get static_post by static_post_name
    ---
    tags:
      - Static Post
    parameters:
      - in: path
        name: static_post_name
        type: string
        required: true
        description: static_post_name
    responses:
      200:
        description: get static_post successful
      404:
        description: static_post not found
    """
    static_post = StaticPost.query.filter_by(static_post_name=static_post_name).first()
    if not static_post:
        return Response.not_found('static_post not found')
    static_post.viewer += 1
    db.session.commit()
    return Response.response('get static_post successful', static_post.as_dict())


@static_post_blueprint.route('', methods=['GET'])
def get_static_posts():
    """
    Get all static_posts
    ---
    tags:
      - Static Post
    responses:
      200:
        description: get posts successful
    """
    static_posts = StaticPost.query.all()
    return Response.response('get posts successful', [static_post.as_dict() for static_post in static_posts])


@static_post_blueprint.route('', methods=['POST'])
def upload_static_posts():
    """
    Upload static_post
    ---
    tags:
        - Static Post
    parameters:
      - in: formData
        name: content
        type: string
        required: true
        description: content
      - in: formData
        name: static_post_name
        type: string
        required: true
        description: static_post_name
      - in: formData
        name: attachments
        type: string
        required: true
        description: attachments
    responses:
      200:
        description: upload static_post success
      400:
        description: no ['title', 'content', 'static_post_name', 'attachments'] or content in form
    """
    if not api_input_check(['content', 'static_post_name', 'attachments'], request.form):
        Response.client_error("no ['content', 'static_post_name', 'attachments'] or content in form")

    content, static_post_name, attachments = api_input_get(
        ['content', 'static_post_name', 'attachments'], request.form
    )

    if static_post_name not in Config.STATIC_POST_COLUMN:
        Response.not_found('column not found')

    static_post = StaticPost(static_post_name=static_post_name, content=content, attachments=attachments)
    db.session.add(static_post)
    db.session.commit()
    return Response.response('upload static_post success', static_post.as_dict())


@static_post_blueprint.route('/<static_post_name>', methods=['PUT'])
def update_static_post(static_post_name):
    """
    Update static_post by static_post_name
    ---
    tags:
        - Static Post
    parameters:
      - in: path
        name: static_post_name
        type: string
        required: true
        description: static_post_name
      - in: formData
        name: title
        type: string
        required: true
        description: title
      - in: formData
        name: content
        type: string
        required: true
        description: content
      - in: formData
        name: attachments
        type: string
        required: true
        description: attachments
      - in: formData
        name: visible
        type: string
        required: true
        description: visible
      - in: formData
        name: importance
        type: string
        required: true
        description: importance
    responses:
      200:
        description: update static_post successful
      404:
        description: static_post not found
    """
    static_post = StaticPost.query.filter_by(static_post_name=static_post_name).first()
    if not static_post:
        return Response.response('static_post not found', None)

    static_post.content = request.form.get('content')
    static_post.attachments = request.form.get('attachments')
    db.session.commit()

    return Response.response('update static_post successful', static_post.as_dict())


@static_post_blueprint.route('/<static_post_name>/image', methods=['POST'])
def add_static_images(static_post_name):
    """
    Add static_post images
    ---
    tags:
      - Static Post
    parameters:
      - in: path
        name: static_post_name
        type: string
        required: true
        description: static_post_name
      - in: formData
        name: blob_attachment
        type: file
        required: true
        description: blob_attachment
    responses:
      200:
        description: add images successful
      404:
        description: static_post not found
    """
    static_post = StaticPost.query.filter_by(static_post_name=static_post_name).first()

    if not static_post:
        return Response.not_found('static_post not found', None)

    blob_attachment = request.files['blob_attachment']
    file_name = blob_attachment.filename
    new_file_name = f"{uuid.uuid4()}.{file_name.split('.')[-1]}"
    new_file_path = Path(Config.STATIC_POST_CONFIG['IMAGE_DIR']) / Path(new_file_name)

    blob_attachment.save(new_file_path)
    image = StaticImage(name=file_name, file_path=str(new_file_path), post_id=static_post.id)
    db.session.add(image)
    db.session.commit()

    return Response.response(
        'add images successful',
        {
            'image_id': str(image.id),
            'image_uri': f'/api/image/static/{image.id}'
        })


@static_post_blueprint.route('/<static_post_name>/attachment', methods=['POST'])
def add_static_attachments(static_post_name):
    """
    Add static_post attachments
    ---
    tags:
      - Static Post
    parameters:
      - in: path
        name: static_post_name
        type: string
        required: true
        description: static_post_name
      - in: formData
        name: blob_attachment
        type: file
        required: true
        description: blob_attachment
    responses:
      200:
        description: add attachments successful
      404:
        description: static_post not found
    """
    static_post = StaticPost.query.filter_by(static_post_name=static_post_name).first()
    if not static_post:
        return Response.not_found('static_post not found', None)

    blob_attachment = request.files['blob_attachment']
    file_name = blob_attachment.filename
    new_file_name = f"{uuid.uuid4()}.{file_name.split('.')[-1]}"
    new_file_path = Path(Config.STATIC_POST_CONFIG['ATTACHMENT_DIR']) / Path(new_file_name)

    blob_attachment.save(new_file_path)
    attachment = StaticAttachment(name=file_name, file_path=str(new_file_path), post_id=static_post.id)
    db.session.add(attachment)
    db.session.commit()

    return Response.response(
        'add attachments successful',
        {
            'attachment_id': str(attachment.id),
            'attachment_name': attachment.name,
            'attachment_uri': f'/api/attachment/static/{attachment.id}',
            'attachment_info': f'/api/attachment/static/{attachment.id}/info'
        }
    )


@static_post_blueprint.route('/<static_post_name>', methods=['DELETE'])
def delete_static_post(static_post_name):
    """
    Delete static_post by static_post_name
    ---
    tags:
      - Static Post
    parameters:
      - in: path
        name: static_post_name
        type: string
        required: true
        description: static_post_name
    responses:
      200:
        description: delete static_post successful
      404:
        description: static_post not found
    """
    static_post = StaticPost.query.filter_by(static_post_name=static_post_name)
    if not static_post:
        return Response.not_found('static_post not found', None)

    images = StaticImage.query.filter_by(static_post_id=static_post.id).delete()
    for image in images:
        os.remove(image.file_path)
        db.session.delete(image)

    attachments = StaticAttachment.query.filter_by(static_post_id=static_post.id).delete()
    for attachment in attachments:
        os.remove(attachment.file_path)
        db.session.delete(attachment)

    db.session.delete(static_post)
    db.session.commit()

    return Response.response('delete static_post successful', None)
