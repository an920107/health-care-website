from helpers.CustomResponse import CustomResponse

from models.post_model import Post, db
from flask import Blueprint, request
from sqlalchemy import desc, or_
import math

post_blueprint = Blueprint('post', __name__)


class PostContainer:
    def __init__(self, json_request):
        if "title" not in json_request:
            raise "Title is required."
        if "content" not in json_request:
            raise "Content is required."
        if "title_en" not in json_request:
            raise "Title_En is required."
        if "content_en" not in json_request:
            raise "Content_En is required."
        if "column" not in json_request:
            raise "Column is required."
        if "attachments" not in json_request:
            raise "Attachments is required."
        if "importance" not in json_request:
            raise "Importance is required."
        if "visibility" not in json_request:
            raise "Visibility is required."

        self.data = {
            "title": json_request["title"],
            "content": json_request["content"],
            "title_en": json_request["title_en"],
            "content_en": json_request["content_en"],
            "column": json_request["column"],
            "attachments": json_request["attachments"],
            "importance": json_request["importance"],
            "visibility": json_request["visibility"]
        }

    def get_data(self):
        return self.data


@post_blueprint.route('<int:id_>', methods=['GET'])
def get_post(id_):
    """
    get posts
    ---
    tags:
      - post
    responses:
      200:
        description: get post success
        schema:
          id: Post
      404:
        description: post not found
        schema:
          id: NotFound
    """
    post = db.session.query(Post).get(id_)

    if post is None:
        return CustomResponse.not_found("Post not found", {})

    post.viewer += 1
    db.session.commit()

    return CustomResponse.success("get post success", post.to_dict())


@post_blueprint.route('', methods=['GET'])
def get_posts():
    """
    get posts
    ---
    tags:
      - post
    parameters:
      - in: query
        name: column
        type: string
        required: false
      - in: query
        name: page
        type: integer
        required: false
      - in: query
        name: search
        type: string
        required: false
      - in: query
        name: visibility
        type: boolean
        required: false
    responses:
      200:
        description: get posts success
        schema:
          id: PostQuery
    """

    page = int(request.args['page']) \
        if "page" in request.args and int(request.args['page']) > 1 \
        else 1

    posts = db.session.query(Post)

    if "column" in request.args:
        posts = posts.filter(
            Post.column.in_(request.args['column'].split('+'))
        )

    if "search" in request.args:
        posts = posts.filter(or_(*[Post.title.like(f'%{term}%') for term in request.args['search'].split('+')]))

    if "visibility" in request.args:
        posts = posts.filter(
            Post.visibility == (False if request.args['visibility'] == 'false' else True)
        )

    posts = posts.order_by(desc(Post.importance), desc(Post.created_time)).all()
    total_page = math.ceil(len(posts) // 10)
    posts = [post.to_dict() for post in posts][(page - 1) * 10:page * 10]

    return {'message': "get posts success", 'data': posts, "total_page": total_page}, 200


@post_blueprint.route('', methods=['POST'])
def post_post():
    """
    post post
    ---
    tags:
      - post
    parameters:
      - in: body
        name: json
        required: true
        schema:
          id: PostInput
    responses:
      201:
        description: post post success
        schema:
          id: Post
      422:
        description: unprocessable content
        schema:
          id: UnprocessableContent
    """
    try:
        request_payload = PostContainer(request.json).get_data()
    except Exception as e:
        return CustomResponse.unprocessable_content(str(e), {})

    post = Post(**request_payload)
    db.session.add(post)
    db.session.commit()

    return CustomResponse.created("post post success", post.to_dict())


@post_blueprint.route('<int:id_>', methods=['PATCH'])
def patch_post(id_):
    """
    patch post
    ---
    tags:
      - post
    parameters:
      - name: id_
        in: path
        type: integer
        required: true
      - in: body
        name: json
        required: true
        schema:
          id: PostInput
    responses:
      204:
        description: patch post success
        schema:
          id: Post
      404:
        description: post not found
        schema:
          id: NotFound
    """
    post = db.session.query(Post).get(id_)

    if post is None:
        return CustomResponse.not_found("Post not found", {})

    if 'title' in request.json:
        post.title = request.json['title']
    if 'content' in request.json:
        post.content = request.json['content']
    if 'title_en' in request.json:
        post.title_en = request.json['title_en']
    if 'content_en' in request.json:
        post.content_en = request.json['content_en']
    if 'column' in request.json:
        post.column = request.json['column']
    if 'attachments' in request.json:
        post.attachments = request.json['attachments']
    if 'importance' in request.json:
        post.importance = request.json['importance']
    if 'visibility' in request.json:
        post.visibility = request.json['visibility']

    db.session.commit()
    return CustomResponse.no_content("patch post success", post.to_dict())


@post_blueprint.route('<int:id_>', methods=['DELETE'])
def delete_post(id_):
    """
    delete post
    ---
    tags:
      - post
    parameters:
      - name: id_
        in: path
        type: integer
        required: true
    responses:
      200:
        description: delete post success
      404:
        description: post not found
        schema:
          id: NotFound
    """
    post = db.session.query(Post).get(id_)

    if post is None:
        return CustomResponse.not_found("Post not found", {})

    db.session.delete(post)
    db.session.commit()

    return CustomResponse.no_content("delete post success", {})
