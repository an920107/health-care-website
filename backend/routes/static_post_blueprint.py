import json
import os
import uuid
from pathlib import Path
from config import Config

from script.utils import api_input_check, api_input_get
from script.oauth_scripts import authorization_required

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
    post_path = Config.STATIC_POST_CONFIG['POST_DIR'] / Path(f"{static_post_name}.json")
    if not os.path.exists(post_path):
        return Response.not_found('static_post not found')

    with open(post_path, "r") as f:
        static_post = json.load(f)

    static_post['viewer'] += 1
    with open(post_path, "w") as f:
        json.dump(static_post, f)

    return Response.response('get static_post successful', {key: str(value) for key, value in static_post.items()})


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
    static_posts = [
        json.load(open(static_post, "r")) for static_post in
        Path(Config.STATIC_POST_CONFIG['POST_DIR']).glob("*.json")
    ]
    return Response.response('get posts successful', static_posts)


@static_post_blueprint.route('', methods=['POST'])
@authorization_required([0, 1, 2])
def upload_static_posts():
    """
    Upload static_post
    ---
    tags:
        - Static Post
    security:
    - BearerAuth: []
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

    static_post = {
        "static_post_name": static_post_name,
        "content": content,
        "attachments": attachments,
        "viewer": 0,
    }

    with open(Path(Config.STATIC_POST_CONFIG['POST_DIR']) / Path(f"{static_post_name}.json"), "w") as f:
        json.dump(static_post, f)

    return Response.response('upload static_post success', static_post)


@static_post_blueprint.route('/<static_post_name>', methods=['PUT'])
@authorization_required([0, 1, 2])
def update_static_post(static_post_name):
    """
    Update static_post by static_post_name
    ---
    tags:
        - Static Post
    security:
    - BearerAuth: []
    parameters:
      - in: path
        name: static_post_name
        type: string
        required: true
        description: static_post_name
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
    responses:
      200:
        description: update static_post successful
      404:
        description: static_post not found
    """

    post_path = Config.STATIC_POST_CONFIG['POST_DIR'] / Path(f"{static_post_name}.json")
    if not os.path.exists(post_path):
        return Response.not_found('static_post not found')

    if not api_input_check(['content', 'attachments'], request.form):
        return Response.client_error('no [content, attachments] in form')

    with open(post_path, "r") as f:
        static_post = json.load(f)

    content, attachments = api_input_get(['content', 'attachments'], request.form)
    static_post['content'] = content
    static_post['attachments'] = attachments

    with open(post_path, "w") as f:
        json.dump(static_post, f)

    return Response.response('update static_post successful', static_post)


@static_post_blueprint.route('/<static_post_name>/image', methods=['POST'])
@authorization_required([0, 1, 2])
def add_static_images(static_post_name):
    """
    Add static_post images
    ---
    tags:
      - Static Post
    security:
    - BearerAuth: []
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

    if not os.path.exists(Config.STATIC_POST_CONFIG['POST_DIR'] / Path(f"{static_post_name}.json")):
        return Response.not_found('static_post not found', None)

    blob_attachment = request.files['blob_attachment']
    file_name = blob_attachment.filename

    if '.' + file_name.split('.')[-1] not in Config.ALLOW_IMAGE_ENDSWITH:
        return Response.client_error('file type not allowed')

    new_file_name = f"{uuid.uuid4()}__{file_name}"
    new_file_path = Path(Config.STATIC_POST_CONFIG['IMAGE_DIR']) / Path(new_file_name)
    blob_attachment.save(new_file_path)

    return Response.response(
        'add images successful',
        {
            'image_id': str(new_file_name),
            'image_uri': f'/api/image/static/{new_file_name}'
        })


@static_post_blueprint.route('/<static_post_name>/attachment', methods=['POST'])
@authorization_required([0, 1, 2])
def add_static_attachments(static_post_name):
    """
    Add static_post attachments
    ---
    tags:
      - Static Post
    security:
    - BearerAuth: []
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

    if not os.path.exists(Config.STATIC_POST_CONFIG['POST_DIR'] / Path(f"{static_post_name}.json")):
        return Response.not_found('static_post not found', None)

    blob_attachment = request.files['blob_attachment']
    file_name = blob_attachment.filename

    if '.' + file_name.split('.')[-1] not in Config.ALLOW_FILE_ENDSWITH:
        return Response.client_error('file type not allowed')

    new_file_name = f"{uuid.uuid4()}__{file_name}"
    new_file_path = Path(Config.STATIC_POST_CONFIG['ATTACHMENT_DIR']) / Path(new_file_name)
    blob_attachment.save(new_file_path)

    return Response.response(
        'add attachments successful',
        {
            'attachment_id': str(new_file_name),
            'attachment_name': file_name,
            'attachment_uri': f'/api/attachment/static_post/{new_file_name}',
            'attachment_info': f'/api/attachment/static_post/{new_file_name}/info'
        }
    )
