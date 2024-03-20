import os
import uuid
from pathlib import Path
from config import Config

from script.utils import api_input_check, api_input_get

from models.models import RestaurantPost, db, RestaurantAttachment
from models.responses import Response

from flask import Blueprint, request

restaurant_blueprint = Blueprint('restaurant', __name__)


@restaurant_blueprint.route('/<int:post_id>', methods=['GET'])
def get_restaurant_post(post_id):
    """
    Get restaurant post by id
    ---
    tags:
      - Restaurant Post
    parameters:
      - name: post_id
        in: path
        type: integer
        required: true
        description: post id
    responses:
      200:
        description: get post success
      404:
        description: post not found
    """
    restaurant_post = db.session.query(RestaurantPost).get(post_id).first()
    if restaurant_post is None:
        return Response.not_found('post not found')
    return Response.response('get post success', restaurant_post.to_json())


@restaurant_blueprint.route('/', methods=['GET'])
def get_restaurant_posts():
    """
    Get restaurant posts
    ---
    tags:
      - Restaurant Post
    parameters:
      - name: page
        in: query
        type: integer
        required: false
        description: page
    responses:
      200:
        description: get post success
      404:
        description: post not found
    """
    restaurant_post = db.session.query(RestaurantPost).all()
    restaurant_post.sort(key=lambda x: x.importance, reverse=True)
    if 'page' in request.args and int(request.args['page']) > 0:
        page = int(request.args['page'])
        restaurant_post = restaurant_post[(page - 1) * Config.PAGE_SIZE: page * Config.PAGE_SIZE]

    return Response.response('get post success', [p.as_dict() for p in restaurant_post])


@restaurant_blueprint.route('/', methods=['POST'])
def post_restaurant_post():
    """
    Post restaurant post
    ---
    tags:
      - Restaurant Post
    parameters:
      - name: title
        in: formData
        type: string
        required: true
        description: title
      - name: attachments
        in: formData
        type: string
        required: true
        description: attachments
      - name: category
        in: formData
        type: string
        required: true
        description: category
      - name: time
        in: formData
        type: string
        required: true
        description: time
      - name: valid
        in: formData
        type: string
        required: true
        description: valid
    responses:
      200:
        description: post restaurant_post success
    """
    if not api_input_check(request, ['title', 'attachments', 'category', 'time', 'valid']):
        return Response.client_error("missing ['title', 'attachments', 'category', 'time', 'valid'] form data")

    title, attachments, category, time, valid = api_input_get(
        ['title', 'attachments', 'category', 'time', 'valid'], request.form
    )

    restaurant_post = RestaurantPost(title=title, attachments=attachments, category=category, time=time, valid=valid)
    db.session.add(restaurant_post)
    db.session.commit()
    return Response.response('post restaurant_post success', restaurant_post.as_dict())


@restaurant_blueprint.route('/<int:post_id>', methods=['PUT'])
def put_restaurant_post(post_id):
    """
    Put restaurant post by id
    ---
    tags:
      - Restaurant Post
    parameters:
      - name: post_id
        in: path
        type: integer
        required: true
        description: post id
      - name: title
        in: formData
        type: string
        required: true
        description: title
      - name: attachments
        in: formData
        type: string
        required: true
        description: attachments
      - name: category
        in: formData
        type: string
        required: true
        description: category
      - name: time
        in: formData
        type: string
        required: true
        description: time
      - name: valid
        in: formData
        type: string
        required: true
        description: valid
    responses:
      200:
        description: put restaurant_post success
      404:
        description: post not found
    """
    restaurant_post = db.session.query(RestaurantPost).get(post_id).first()
    if restaurant_post is None:
        return Response.not_found('post not found')

    if api_input_check(['title', 'attachments', 'category', 'time', 'valid'], request.form):
        return Response.client_error("missing ['title', 'attachments', 'category', 'time', 'valid'] form data")

    title, attachments, category, time, valid = api_input_get(
        ['title', 'attachments', 'category', 'time', 'valid'], request.form
    )

    restaurant_post.title = title
    restaurant_post.attachments = attachments
    restaurant_post.category = category
    restaurant_post.time = time
    restaurant_post.valid = valid
    db.session.commit()

    return Response.response('put restaurant_post success', restaurant_post.as_dict())


@restaurant_blueprint.route('/<int:post_id>', methods=['DELETE'])
def delete_restaurant_post(post_id):
    """
    Delete restaurant post by id
    ---
    tags:
      - Restaurant Post
    parameters:
      - name: post_id
        in: path
        type: integer
        required: true
        description: post id
    responses:
      200:
        description: delete restaurant_post success
      404:
        description: post not found
    """
    restaurant_post = RestaurantPost.get(post_id).first()
    if restaurant_post is None:
        return Response.not_found('post not found')

    attachments = RestaurantAttachment.query.filter_by(post_id=post_id).delete()
    for attachment in attachments:
        os.remove(attachment.file_path)
        db.session.delete(attachment)

    db.session.delete(restaurant_post)
    db.session.commit()
    return Response.response('delete restaurant_post success')


@restaurant_blueprint.route('/<int:post_id>/importance', methods=['PATCH'])
def patch_restaurant_post_importance(post_id):
    """
    Patch restaurant post importance
    ---
    tags:
      - Restaurant Post
    parameters:
      - name: post_id
        in: path
        type: integer
        required: true
        description: post id
      - name: importance
        in: formData
        type: string
        required: true
        description: importance
    responses:
      200:
        description: patch restaurant_post importance success
      404:
        description: post not found
    """
    restaurant_post = db.session.query(RestaurantPost).get(post_id).first()
    if restaurant_post is None:
        return Response.not_found('post not found')

    importance = request.form.get('importance')
    restaurant_post.importance = importance
    db.session.commit()
    return Response.response('patch restaurant_post importance success', restaurant_post.as_dict())


@restaurant_blueprint.route('/<int:post_id>/visible', methods=['PATCH'])
def patch_restaurant_post_visible(post_id):
    """
    Patch restaurant post visible
    ---
    tags:
      - Restaurant Post
    parameters:
      - name: post_id
        in: path
        type: integer
        required: true
        description: post id
      - name: visible
        in: formData
        type: string
        required: true
        description: visible
    responses:
      200:
        description: patch restaurant_post visible success
      404:
        description: post not found
    """
    restaurant_post = db.session.query(RestaurantPost).get(post_id).first()
    if restaurant_post is None:
        return Response.not_found('post not found')

    visible = request.form.get('visible')
    restaurant_post.visible = visible
    db.session.commit()
    return Response.response('patch restaurant_post visible success', restaurant_post.as_dict())


@restaurant_blueprint.route('/<int:post_id>/attachment', methods=['POST'])
def post_restaurant_attachment(post_id):
    """
    Post restaurant attachment
    ---
    tags:
      - Restaurant Post
    parameters:
      - name: post_id
        in: path
        type: integer
        required: true
        description: post id
      - name: blob_attachment
        in: formData
        type: file
        required: true
        description: The attachment to upload
    responses:
      200:
        description: post attachment successful
      400:
        description: no blob attachment
    """
    if 'blob_attachment' not in request.files:
        return Response.client_error('no blob attachment')

    blob_attachment = request.files['blob_attachment']
    file_name = f"{uuid.uuid4()}.{blob_attachment.filename.split('.')[-1]}."
    file_path = Path(Config.RESTAURANT_CONFIG['ATTACHMENT_DIR']) / Path(file_name)
    blob_attachment.save(file_path)

    attachment = RestaurantAttachment(name=blob_attachment.filename, file_path=file_path, post_id=post_id)
    db.session.add(attachment)
    db.session.commit()
    return Response.response(
        'add attachments successful',
        {
            'attachment_id': str(attachment.id),
            'attachment_name': attachment.name,
            'attachment_url': f'http://{request.host}/api/attachment/restaurant/{attachment.id}',
            'attachment_info': f'http://{request.host}/api/attachment/restaurant/{attachment.id}/info'
        })

