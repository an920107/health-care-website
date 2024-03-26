import sys
import os

import uuid
from pathlib import Path

from flask import Blueprint
from flask import request, send_file

from package.response import Response
from package.database_model import *
from package.database_operator import *

from script.utils import *

posts_blueprints = Blueprint('posts', __name__)

ALLOW_IMAGE_ENDSWITH = ['.png', '.jpg', '.jpeg']
ALLOW_FILE_ENDSWITH = ['.doc', '.docx', '.ppt', '.pptx', '.pdf', '.xls', '.xlsx', '.csv', '.odt']
GET_POST_PER_PAGE = 10


@posts_blueprints.route("/post_importance", methods=['PUT'])
def put_post_importance():
    """
    Toggle the importance of a post
    ---
    tags:
      - POST
    parameters:
      - name: id
        in: formData
        type: string
        required: true
        description: The id of the post
      - name: importance
        in: formData
        type: string
        required: true
        description: The importance of the post
    """
    if not api_input_check(['id', 'importance'], request.form):
        Response.client_error('no id or importance in form')
    id_, importance = api_input_get(['id', 'importance'], request.form)
    DatabaseOperator.update(Post, {'id': int(id_)}, {'importance': importance})
    return Response.response('update importance success', {'id': id_, 'importance': importance})


@posts_blueprints.route("/post", methods=['GET'])
def get_post():
    """
    Get posts in three ways.
    ---
    tags:
      - POST
    parameters:
      - name: id
        in: query
        type: string
        required: false
        description: The id of the post
      - name: column
        in: query
        type: string
        required: false
        description: The column of the posts
        enum: ['activity', 'health', 'restaurant', 'nutrition']
      - name: pages
        in: query
        type: string
        required: false
        description: The pages of the posts
    responses:
      200:
        description: Return a success message
        schema:
          type: object
          properties:
            description:
              type: string
            response:
              type: object
              properties:
                pages:
                  type: string
                posts:
                  type: array
                  items:
                    type: object
                    properties:
                      column:
                        type: string
                      id:
                        type: string
                      title:
                        type: string
                      visible:
                        type: string
                      update_time:
                        type: string
                total_page:
                  type: string
      400:
        description: Return a client error message
      404:
        description: Return a client column not found message
      500:
        description: Return a sever error message
    """
    # get post by id
    if api_input_check(['id'], request.args):
        id_ = request.args['id']
        post = DatabaseOperator.select_one(Post, {'id': int(id_)})
        return Response.response('get post success', post.as_dict()) \
            if post is not None \
            else Response.not_found('post not found')

    # filter posts by column
    elif (api_input_check(['column'], request.args)
          and request.args['column'] in ['activity', 'health', 'restaurant', 'nutrition']):
        posts = DatabaseOperator.select_all(Post, {'column': request.args['column']})
    # get all posts
    else:
        posts = DatabaseOperator.select_all(Post)

    # filter posts by pages default is one
    if api_input_check(['pages'], request.args) and int(request.args['pages']) > 0:
        page = int(request.args['pages'])
    else:
        page = 1

    posts_payload = {
        'total_page': str(len(posts) // GET_POST_PER_PAGE + 1),
        'pages': str(page),
        'posts': []
    }

    sorted_posts = sorted(posts, key=lambda x: (x.importance, x.create_time), reverse=True)
    for post in sorted_posts[(page - 1) * GET_POST_PER_PAGE: page * GET_POST_PER_PAGE]:
        posts_payload['posts'].append(post.as_dict())

    return Response.response('get post success', posts_payload)


@posts_blueprints.route("/post", methods=['POST'])
def upload_post():
    """
    Upload a post
    ---
    tags:
      - POST
    parameters:
      - name: title
        in: formData
        type: string
        required: true
        description: The title of the post
      - name: content
        in: formData
        type: string
        required: true
        description: The content of the post
      - name: column
        in: formData
        type: string
        required: true
        description: The column to upload the post to
        enum: ['activity', 'health', 'restaurant', 'nutrition']
      - name: attachments
        in: formData
        type: string
        required: true
        description: The attachments of the posts
    responses:
      200:
        description: Return a success message
        schema:
          type: object
          properties:
            description:
              type: string
            response:
              type: object
              properties:
                column:
                  type: string
                content:
                  type: string
                create_time:
                  type: string
                id:
                  type: string
                title:
                  type: string
                update_time:
                  type: string
                  description: Return datetime in iso format.
      400:
        description: Return a client error message
      404:
        description: Return a client column not found message
      500:
        description: Return a sever error message
    """
    if not api_input_check(['title', 'content', 'column', 'attachments'], request.form):
        Response.client_error('no title or content in form')

    title, content, column, attachments = api_input_get(
        ['title', 'content', 'column', 'attachments'], request.form
    )

    if column not in ['activity', 'health', 'restaurant', 'nutrition']:
        Response.not_found('column not found')

    post = DatabaseOperator.insert(Post, {
        'title': title, 'content': content, 'column': column, 'attachments': attachments
    })
    return Response.response('post post success', post.as_dict())


@posts_blueprints.route("/post", methods=['PUT'])
def update_post():
    """
    Update a post
    ---
    tags:
      - POST
    parameters:
      - name: id
        in: formData
        type: integer
        required: true
        description: The id of the post
      - name: title
        in: formData
        type: string
        required: true
        description: The title of the post
      - name: content
        in: formData
        type: string
        required: true
        description: The content of the post
      - name: visible
        in: formData
        type: string
        required: true
        description: The content of the post
      - name: column
        in: formData
        type: string
        required: true
        description: The column to upload the post to
        enum: ['activity', 'health', 'restaurant', 'nutrition']
      - name: attachments
        in: formData
        type: string
        required: true
        description: The attachments of the posts
    responses:
      200:
        description: Return a success message
        schema:
          type: object
          properties:
            description:
              type: string
            response:
              type: object
              properties:
                column:
                  type: string
                content:
                  type: string
                create_time:
                  type: string
                id:
                  type: string
                title:
                  type: string
                visible:
                  type: string
                update_time:
                  type: string
                  description: Return datetime in iso format.
      400:
        description: Return a client error message
      404:
        description: Return a client column not found message
      500:
        description: Return a sever error message
    """

    if not api_input_check(['id', 'title', 'content', 'column', 'visible', 'attachments'], request.form):
        Response.client_error('no title or content in form')

    id_, title, content, column, visible, attachments = api_input_get(
        ['id', 'title', 'content', 'column', 'visible', 'attachments'], request.form
    )

    if column not in ['activity', 'health', 'restaurant', 'nutrition']:
        Response.not_found('column not found')

    post = DatabaseOperator.update(Post, {'id': int(id_)}, {
        'title': title, 'content': content, 'column': column, 'visible': visible, 'attachments': attachments
    })

    if post is None:
        return Response.not_found('post not found')

    return Response.response('update post success', post.as_dict())


@posts_blueprints.route("/post", methods=['DELETE'])
def delete_post():
    """
    Upload a post
    ---
    tags:
      - POST
    parameters:
      - name: id
        in: query
        type: integer
        required: false
        description: The title of the post
    responses:
      200:
        description: Return a success message
      400:
        description: Return a client error message
      404:
        description: Return a client column not found message
      500:
        description: Return a sever error message
    """

    if 'id' not in request.args:
        DatabaseOperator.delete(Post, {})
        return Response.response('delete all post success')

    id_ = request.args['id']
    DatabaseOperator.delete(Post, {'id': int(id_)})
    return Response.response('delete post success')


@posts_blueprints.route("/allow_endswith", methods=['GET'])
def get_allow_endswith():
    """
    Get allow endswith.
    > ['.png', '.jpg', '.jpeg', '.doc', '.docx', '.ppt', '.pptx', '.pdf', '.xls', '.xlsx', '.csv', '.odt']
    ---
    tags:
      - POST
    responses:
      200:
        description: Return a success message
        schema:
          type: object
          properties:
            description:
              type: string
            response:
              type: array
              items:
                type: string
    """
    return Response.response('get allow success', ALLOW_IMAGE_ENDSWITH + ALLOW_FILE_ENDSWITH)


@posts_blueprints.route("/attachment", methods=['POST'])
def post_attachment():
    """
    Upload Post Image or File.

    * ALLOW_IMAGE_ENDSWITH = ['.png', '.jpg', '.jpeg']
    * ALLOW_FILE_ENDSWITH = ['.doc', '.docx', '.ppt', '.pptx', '.pdf', '.xlsx', '.csv', '.odt']

    ---
    tags:
      - POST
    parameters:
      - name: blob_attachment
        in: formData
        type: file
        required: true
        description: The post blob images to be uploaded.
    responses:
      200:
        description: Connection successful.
        schema:
          type: object
          properties:
            description:
              type: string
            response:
              type: object
              properties:
                attachment_id:
                  type: string
                attachment_name:
                  type: string
                attachment_url:
                  type: string
                attachment_info:
                  type: string
    """
    if not api_input_check(['blob_attachment'], request.files):
        return Response.client_error('no blob attachments')

    blob_attachment = request.files['blob_attachment']
    file_name = blob_attachment.filename
    new_file_name = f"{uuid.uuid4()}.{file_name.split('.')[-1]}"

    if endswith_check(file_name, ALLOW_FILE_ENDSWITH):
        file_path = Path('posts/uploads/attachments') / Path(new_file_name)
    elif endswith_check(file_name, ALLOW_IMAGE_ENDSWITH):
        file_path = Path('posts/uploads/images') / Path(new_file_name)
    else:
        return Response.client_error('extension not allow')

    blob_attachment.save(file_path)
    file = DatabaseOperator.insert(File, {
        'name': file_name,
        'file_path': file_path.__str__(),
    })

    return Response.response(
        'post attachment success', {
            'attachment_id': str(file.id),
            'attachment_name': file.name,
            'attachment_url': f'http://{request.host}/api/posts/get_attachment?attachment_id={file.id}',
            'attachment_info': f'http://{request.host}/api/posts/get_attachment_info?attachment_id={file.id}',
        })


@posts_blueprints.route("/attachment", methods=['GET'])
def get_attachment():
    """
    Download an attachment by attachment_id
    ---
    tags:
      - POST
    parameters:
      - name: attachment_id
        in: query
        type: string
        required: true
        description: The ID of the images to download
    responses:
      200:
        description: Return the images file
      404:
        description: File not found
    """
    file_id = request.args.get('attachment_id')
    attachment = DatabaseOperator.select_one(File, {'id': int(file_id)})
    if not (attachment and os.path.exists(attachment.file_path)):
        return Response.not_found('attachments not found')
    return send_file(attachment.file_path)


@posts_blueprints.route("/attachment", methods=['DELETE'])
def delete_attachment():
    """
    Delete an attachment by attachment_id
    ---
    tags:
      - POST
    parameters:
      - name: attachment_id
        in: query
        type: string
        required: true
        description: The ID of the images to download
    responses:
      200:
        description: Return the images file
      404:
        description: File not found
    """
    attachment_id = request.args.get('attachment_id')
    try:
        file = DatabaseOperator.select_one(File, {'id': int(attachment_id)})
        os.remove(file.file_path)
    except Exception:
        pass
    DatabaseOperator.delete(File, {'id': int(attachment_id)})
    return Response.response('delete attachment success')


@posts_blueprints.route("/attachment_info", methods=['GET'])
def get_attachment_info():
    """
    Get the attachment info by attachment_id
    ---
    tags:
      - POST
    parameters:
      - name: attachment_id
        in: query
        type: string
        required: true
        description: The ID of the images to get INFO
    responses:
      200:
        description: Return the images file
      404:
        description: File not found
    """
    file_id = request.args.get('attachment_id')
    attachment = DatabaseOperator.select_one(File, {'id': int(file_id)})
    if not (attachment and os.path.exists(attachment.file_path)):
        return Response.not_found('attachments not found')
    attachment = attachment.as_dict()
    attachment.pop("file_path", None)
    return Response.response("get attachment info success", attachment)
