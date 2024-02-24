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
ALLOW_FILE_ENDSWITH = ['.doc', '.docx', '.ppt', '.pptx', '.pdf', '.xlsx', '.csv']

if not os.path.exists('posts/uploads'):
    os.mkdir('posts/uploads')
    os.mkdir('posts/uploads/images')
    os.mkdir('posts/uploads/attachments')


@posts_blueprints.route("/get_post", methods=['GET'])
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
      - name: page
        in: query
        type: string
        required: false
        description: The page of the posts
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
                page:
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
    if api_input_check(['id'], request.args):
        id_ = request.args['id']
        post = DatabaseOperator.select_one(Post, {'id': int(id_)})
        if post is None:
            return Response.not_found('post not found')
        return Response.response('get post success', post.as_dict())

    elif api_input_check(['column'], request.args):
        column = request.args['column']
        posts = DatabaseOperator.select_all(Post, {'column': column})

    else:
        posts = DatabaseOperator.select_all(Post)

    page = int(request.args['page']) \
        if api_input_check(['page'], request.args) and int(request.args['page']) > 0 \
        else 1

    posts_payload = {
        'total_page': str(len(posts) // 20 + 1),
        'page': str(page),
        'posts': []
    }

    for post in posts[(page - 1) * 20: page * 20]:
        posts_payload['posts'].append({
            'id': str(post.id),
            'title': post.title,
            'column': post.column,
            'create_time': str(post.create_time),
            'update_time': str(post.update_time),
        })

    return Response.response('get post success', posts_payload)


@posts_blueprints.route("/upload_post", methods=['POST'])
def upload_post():
    """
    Upload a post.
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

    if not api_input_check(['title', 'content', 'column'], request.form):
        Response.client_error('no title or content in form')

    title, content, column = api_input_get(['title', 'content', 'column'], request.form)

    if column not in ['activity', 'health', 'restaurant', 'nutrition']:
        Response.not_found('column not found')

    post = DatabaseOperator.insert(Post, {'title': title, 'content': content, 'column': column})
    return Response.response('upload post success', post.as_dict())


@posts_blueprints.route("/update_post", methods=['PUT'])
def update_post():
    """
    Upload a post
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
      - name: column
        in: formData
        type: string
        required: true
        description: The column to upload the post to
        enum: ['activity', 'health', 'restaurant', 'nutrition']
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

    if not api_input_check(['id', 'title', 'content', 'column'], request.form):
        Response.client_error('no title or content in form')

    id_, title, content, column = api_input_get(['id', 'title', 'content', 'column'], request.form)

    if column not in ['activity', 'health', 'restaurant', 'nutrition']:
        Response.not_found('column not found')

    post = DatabaseOperator.update(Post, {'id': int(id_)}, {
        'title': title, 'content': content, 'column': column
    })

    if post is None:
        return Response.not_found('post not found')

    return Response.response('update post success', post.as_dict())


@posts_blueprints.route("/delete_post", methods=['DELETE'])
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
        required: true
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
        Response.client_error('no id in form')

    id_ = request.args['id']

    DatabaseOperator.delete(Post, {'id': int(id_)})
    return Response.response('delete post success')


@posts_blueprints.route("/upload_attachment", methods=['POST'])
def upload_attachment():
    """
    Upload Post Image.
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
                photo_url:
                  type: string
    """
    if 'blob_attachment' not in request.files:
        return Response.client_error('no blob attachments')

    blob_attachment = request.files['blob_attachment']
    file_name = blob_attachment.filename
    new_file_name = f"{uuid.uuid4()}.{file_name.split('.')[-1]}"

    if endswith_check(file_name, ALLOW_FILE_ENDSWITH):
        file_path = Path('posts/uploads/attachments') / Path(new_file_name)

    elif endswith_check(file_name, ALLOW_IMAGE_ENDSWITH):
        file_path = Path('posts/uploads/images') / Path(new_file_name)

    else:
        return Response.response('extension not allow')

    blob_attachment.save(file_path)
    file = DatabaseOperator.insert(File, {
        'name': file_name,
        'file_path': file_path.__str__(),
    })

    return Response.response(
        'upload images success', {
            'photo_url': f'http://{request.host}/api/posts/get_attachment?attachment_id={file.id}'
        })


@posts_blueprints.route("/get_attachment", methods=['GET'])
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
    attachment = DatabaseOperator.select_one(File, {'id': file_id})
    if not (attachment and os.path.exists(attachment.file_path)):
        return Response.not_found('attachments not found')
    return send_file(attachment.file_path)
