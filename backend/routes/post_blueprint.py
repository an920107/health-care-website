import os
import uuid
from config import Config
from pathlib import Path

from script.utils import api_input_check, api_input_get
from script.oauth_scripts import authorization_required

from models.models import Post, db, Image, Attachment
from models.responses import Response

from flask import Blueprint, request

post_blueprint = Blueprint('post', __name__)


@post_blueprint.route('/<int:post_id>', methods=['GET'])
def get_post(post_id):
    """
    Get post by post_id
    ---
    tags:
      - Post
    parameters:
      - name: post_id
        in: path
        description: post_id
        required: true
        type: integer
    responses:
      200:
        description: get post successful
    """
    post = Post.query.get(post_id)
    post.viewer += 1
    db.session.commit()
    return Response.response('get post successful', post.as_dict())


@post_blueprint.route('', methods=['GET'])
def get_posts():
    """
    Get posts
    ---
    tags:
      - Post
    parameters:
      - name: column
        in: query
        description: column
        required: false
        type: string
      - name: importance
        in: query
        description: importance
        required: false
        type: string
      - name: visible
        in: query
        description: visible
        required: false
        type: string
      - name: page
        in: query
        description: page
        required: false
        type: integer
    responses:
      200:
        description: get posts successful
    """
    query_conditions = {}
    if request.args.get('column'):
        query_conditions['column'] = request.args.get('column')
    if request.args.get('visible'):
        query_conditions['visible'] = request.args.get('visible')
    if request.args.get('importance'):
        query_conditions['importance'] = request.args.get('importance')
    if request.args.get('visible'):
        query_conditions['visible'] = request.args.get('visible')

    posts = Post.query.filter_by(**query_conditions).order_by(Post.create_time).all()
    posts.sort(key=lambda x: x.importance, reverse=True)
    total_page = max(1, len(posts) // Config.PAGE_SIZE + bool(len(posts) % Config.PAGE_SIZE))

    if request.args.get('page') and int(request.args['page']) >= 1:
        page = int(request.args['page'])
    else:
        page = 1

    posts = posts[(page - 1) * Config.PAGE_SIZE:page * Config.PAGE_SIZE]

    payload = {
        'total_page': str(total_page),
        'posts': [post.as_dict() for post in posts],
        'page': str(page)
    }
    return Response.response('get posts successful', payload)


@post_blueprint.route('', methods=['POST'])
@authorization_required(2)
def upload_posts():
    """
    Upload post
    ---
    tags:
      - Post
    security:
    - BearerAuth: []
    parameters:
      - name: title
        in: formData
        description: title
        required: true
        type: string
      - name: content
        in: formData
        description: content
        required: true
        type: string
      - name: column
        in: formData
        description: column
        required: true
        type: string
      - name: attachments
        in: formData
        description: attachments
        required: true
        type: string
    responses:
      200:
        description: upload post successful
    """
    if not api_input_check(['title', 'content', 'column', 'attachments'], request.form):
        Response.client_error("no ['title', 'content', 'column', 'attachments'] or content in form")

    title, content, column, attachments = api_input_get(
        ['title', 'content', 'column', 'attachments'], request.form
    )

    if column not in Config.POST_COLUMN:
        Response.not_found('column not found')

    post = Post(title=title, content=content, column=column, attachments=attachments)
    db.session.add(post)
    db.session.commit()
    return Response.response('upload post success', post.as_dict())


@post_blueprint.route('/<int:post_id>', methods=['PUT'])
@authorization_required(2)
def update_post(post_id):
    """
    Update post by post_id
    ---
    tags:
      - Post
    security:
    - BearerAuth: []
    parameters:
      - name: post_id
        in: path
        description: post_id
        required: true
        type: integer
      - name: title
        in: formData
        description: title
        required: true
        type: string
      - name: content
        in: formData
        description: content
        required: true
        type: string
      - name: column
        in: formData
        description: column
        required: true
        type: string
      - name: attachments
        in: formData
        description: attachments
        required: true
        type: string
      - name: visible
        in: formData
        description: visible
        required: true
        type: string
      - name: importance
        in: formData
        description: importance
        required: true
        type: string
    responses:
      200:
        description: update post successful
      404:
        description: post not found
    """
    post = Post.query.get(post_id)
    if not post:
        return Response.not_found('post not found', None)

    if not api_input_check(['title', 'content', 'column', 'attachments', 'visible', 'importance'], request.form):
        Response.client_error(
            "no ['title', 'content', 'column', 'attachments', 'visible', 'importance'] or content in form")

    title, content, column, attachments, visible, importance = api_input_get(
        ['title', 'content', 'column', 'attachments', 'visible', 'importance'], request.form
    )

    post.title = title
    post.content = content
    post.column = column
    post.attachments = attachments
    post.visible = visible
    db.session.commit()

    return Response.response('update post successful', post.as_dict())


@post_blueprint.route('/<int:post_id>/importance', methods=['PATCH'])
@authorization_required(2)
def update_post_importance(post_id):
    """
    Update post importance by post_id
    ---
    tags:
      - Post
    security:
    - BearerAuth: []
    parameters:
      - name: post_id
        in: path
        description: post_id
        required: true
        type: integer
      - name: importance
        in: formData
        description: importance
        required: true
        type: string
    responses:
      200:
        description: update post importance successful
      404:
        description: post not found
    """
    post = Post.query.get(post_id)
    if not post:
        return Response.response('post not found', None)

    post.importance = request.form.get('importance')
    db.session.commit()

    return Response.response('update post importance successful', post.as_dict())


@post_blueprint.route('/<int:post_id>/visible', methods=['PATCH'])
@authorization_required(2)
def update_post_visible(post_id):
    """
    Update post visible by post_id
    ---
    tags:
      - Post
    security:
    - BearerAuth: []
    parameters:
      - name: post_id
        in: path
        description: post_id
        required: true
        type: integer
      - name: visible
        in: formData
        description: visible
        required: true
        type: string
    responses:
      200:
        description: update post visible successful
      404:
        description: post not found
    """
    post = Post.query.get(post_id)
    if not post:
        return Response.not_found('post not found', None)

    post.visible = request.form.get('visible')
    db.session.commit()

    return Response.response('update post visible successful', post.as_dict())


@post_blueprint.route('/<int:post_id>/image', methods=['POST'])
@authorization_required(2)
def add_images(post_id):
    """
    Add images to post by post_id
    ---
    tags:
      - Post
    security:
    - BearerAuth: []
    parameters:
      - name: post_id
        in: path
        description: post_id
        required: true
        type: integer
      - name: blob_attachment
        in: formData
        description: blob_attachment
        required: true
        type: file
    responses:
      200:
        description: add images successful
      404:
        description: post not found
    """
    post = Post.query.get(post_id)
    if not post:
        return Response.not_found('post not found', None)

    blob_attachment = request.files['blob_attachment']
    file_name = blob_attachment.filename
    new_file_name = f"{uuid.uuid4()}.{file_name.split('.')[-1]}"
    new_file_path = Path(Config.POST_CONFIG['IMAGE_DIR']) / Path(new_file_name)

    blob_attachment.save(new_file_path)
    image = Image(name=file_name, file_path=str(new_file_path), post_id=post_id)
    db.session.add(image)
    db.session.commit()

    return Response.response(
        'add images successful',
        {
            'image_id': str(image.id),
            'image_uri': f'/api/image/{image.id}'
        })


@post_blueprint.route('/<int:post_id>/attachment', methods=['POST'])
@authorization_required(2)
def add_attachments(post_id):
    """
    Add attachments to post by post_id
    ---
    tags:
      - Post
    security:
    - BearerAuth: []
    parameters:
      - name: post_id
        in: path
        description: post_id
        required: true
        type: integer
      - name: blob_attachment
        in: formData
        description: blob_attachment
        required: true
        type: file
    responses:
      200:
        description: add attachments successful
      404:
        description: post not found
    """
    post = Post.query.get(post_id)
    if not post:
        return Response.not_found('post not found', None)

    blob_attachment = request.files['blob_attachment']
    file_name = blob_attachment.filename
    new_file_name = f"{uuid.uuid4()}.{file_name.split('.')[-1]}"
    new_file_path = Path(Config.POST_CONFIG['ATTACHMENT_DIR']) / Path(new_file_name)

    blob_attachment.save(new_file_path)
    attachment = Attachment(name=file_name, file_path=str(new_file_path), post_id=post_id)
    db.session.add(attachment)
    db.session.commit()

    return Response.response(
        'add attachments successful',
        {
            'attachment_id': str(attachment.id),
            'attachment_name': attachment.name,
            'attachment_uri': f'/api/attachment/{attachment.id}',
            'attachment_info': f'/api/attachment/{attachment.id}/info'
        }
    )


@post_blueprint.route('/<int:post_id>', methods=['DELETE'])
@authorization_required(2)
def delete_post(post_id):
    """
    Delete post by post_id
    ---
    tags:
      - Post
    security:
    - BearerAuth: []
    parameters:
      - name: post_id
        in: path
        description: post_id
        required: true
        type: integer
    responses:
      200:
        description: delete post successful
      404:
        description: post not found
    """
    post = Post.query.get(post_id)
    if not post:
        return Response.not_found('post not found', None)

    images = Image.query.filter_by(post_id=post_id).all()
    for image in images:
        os.remove(image.file_path)
        db.session.delete(image)

    attachments = Attachment.query.filter_by(post_id=post_id).all()
    for attachment in attachments:
        os.remove(attachment.file_path)
        db.session.delete(attachment)

    db.session.delete(post)
    db.session.commit()

    return Response.response('delete post successful', None)
