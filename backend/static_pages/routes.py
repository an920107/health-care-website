import os
import uuid
import json
from pathlib import Path

from flask import request, send_file, Blueprint
from package.response import Response

from script.utils import *

static_pages_blueprints = Blueprint('static_pages', __name__)

STATIC_PAGES = [
    # about us
    'workTeam', 'serviceHours', 'trafficMap',

    # health care
    'freshmanHealthCheck', 'newEmployeePhysicalExam', 'regularHealthCheck',

    # emergency response
    'emergencyHotline', 'campusInjuryTreatment', 'campusAED',

    # health service
    'studentGroupInsurance', 'medicalEquipmentLoan', 'healthManagementFacilities',

    # health promotion
    'onSiteOccupationalHealthService', 'workplaceHealthServicePlan',

    # health education
    'freshmanCPR', 'campusTobaccoControlEducation', 'campusAIDSPreventionEducation',
    'campusInfectiousDiseasePrevention',
]

STATIC_PAGES_CONFIG = {
    'ATTACHMENT_DIR': './static_pages/static/attachments',
    'IMAGE_DIR': './static_pages/static/images',
    'PAGE_DIR': './static_pages/static/pages',
}


@static_pages_blueprints.route('/static_page', methods=['GET'])
def get_static_page():
    """
    Get static page
    ---
    tags:
      - STATIC PAGE
    parameters:
      - name: page_name
        in: query
        required: true
        schema:
          type: string
    responses:
      200:
        description: Return the static page
      404:
        description: Static page not found
    """
    if 'page_name' not in request.args:
        return Response.client_error('no page_name in args')

    page_name = request.args['page_name']

    if not os.path.exists(STATIC_PAGES_CONFIG['PAGE_DIR'] + page_name + '.json'):
        return Response.not_found(f'{page_name} not found')

    with open(STATIC_PAGES_CONFIG['PAGE_DIR'] + page_name + '.json', 'r') as f:
        page = json.load(f)
        return Response.response('get static page success', page)


@static_pages_blueprints.route('/static_page', methods=['POST'])
def post_static_page():
    """
    Post static page
    ---
    tags:
      - STATIC PAGE
    parameters:
      - name: page_name
        in: formData
        required: true
        schema:
          type: string
      - name: content
        in: formData
        required: true
        schema:
          type: string
      - name: visible
        in: formData
        required: true
        schema:
          type: string
      - name: attachments
        in: formData
        required: true
        schema:
          type: string
    responses:
      200:
        description: Return the static page
      400:
        description: Missing page_name, content, visible, attachments in form
      400:
        description: page_name not allowed
      400:
        description: page_name already exists
    """
    if not api_input_check(['page_name', 'content', 'visible', 'attachments'], request.form):
        return Response.client_error('missing page_name, content, visible, attachments in form')

    page_name, content, visible, attachments = api_input_get([
        'page_name', 'content', 'visible', 'attachments'
    ], request.form)

    if page_name not in STATIC_PAGES:
        return Response.client_error('page_name not allowed')

    if os.path.exists(STATIC_PAGES_CONFIG['PAGE_DIR'] + page_name + '.json'):
        return Response.client_error(f'{page_name} already exists')

    new_static_page = {
        'content': content,
        'visible': visible,
        'attachments': attachments,
    }

    with open(STATIC_PAGES_CONFIG['PAGE_DIR'] + page_name + '.json', 'w') as f:
        f.write(json.dumps(new_static_page))

    return Response.response('post static page success', new_static_page)


@static_pages_blueprints.route('/static_page', methods=['PUT'])
def put_static_page():
    """
    Put static page
    ---
    tags:
      - STATIC PAGE
    parameters:
      - name: page_name
        in: formData
        required: true
        schema:
        type: string
      - name: content
        in: formData
        required: true
        schema:
        type: string
      - name: visible
        in: formData
        required: true
        schema:
        type: string
      - name: attachments
        in: formData
        required: true
        schema:
        type: string
    responses:
      200:
        description: Return the static page
      400:
        description: Missing page_name, content, visible, attachments in form
      404:
        description: page_name not found
    """
    if not api_input_check(['page_name', 'content', 'visible', 'attachments'], request.form):
        return Response.client_error('missing page_name, content, visible, attachments in form')

    page_name, content, visible, attachments = api_input_get([
        'page_name', 'content', 'visible', 'attachments'
    ], request.form)

    if not os.path.exists(STATIC_PAGES_CONFIG['PAGE_DIR'] + page_name + '.json'):
        return Response.not_found(f'{page_name} not found')

    new_static_page = {
        'content': content,
        'visible': visible,
        'attachments': attachments,
    }

    with open(STATIC_PAGES_CONFIG['PAGE_DIR'] + page_name + '.json', 'w') as f:
        f.write(json.dumps(new_static_page))

    return Response.response('put static page success', new_static_page)


@static_pages_blueprints.route('/static_page', methods=['DELETE'])
def delete_static_page():
    """
    Delete static page
    ---
    tags:
      - STATIC PAGE
    parameters:
      - name: page_name
        in: query
        required: true
        schema:
        type: string
    responses:
      200:
        description: Return the static page
      400:
        description: Missing page_name in args
      404:
        description: page_name not found
    """
    if 'page_name' not in request.args:
        return Response.client_error('no page_name in args')

    page_name = request.args['page_name']

    if not os.path.exists(STATIC_PAGES_CONFIG['PAGE_DIR'] + page_name + '.json'):
        return Response.response(f'delete {page_name} successful')

    os.remove(STATIC_PAGES_CONFIG['PAGE_DIR'] + page_name + '.json')
    return Response.response(f'delete {page_name} successful')


@static_pages_blueprints.route('/image', methods=['GET'])
def get_image():
    """
    Get image
    ---
    tags:
      - STATIC PAGE
    parameters:
      - name: image_id
        in: query
        required: true
        schema:
        type: string
    responses:
      200:
        description: Return the image
      400:
        description: Missing image id in args
      404:
        description: Image not found
    """
    if 'image_id' not in request.args:
        return Response.client_error('no image id in args')

    image_path = search_files(STATIC_PAGES_CONFIG['IMAGE_DIR'], request.args['image_id'])

    if image_path is None:
        return Response.not_found('image not found')

    return send_file(image_path, as_attachment=True)


@static_pages_blueprints.route('/image', methods=['POST'])
def post_image():
    """
    Post image
    ---
    tags:
      - STATIC PAGE
    parameters:
      - name: blob_image
        in: formData
        required: true
        schema:
        type: file
    responses:
      200:
        description: Return the image id
      400:
        description: Missing blob image
    """
    if 'blob_image' not in request.files:
        return Response.client_error('no blob image')

    blob_attachment = request.files['blob_image']
    new_attachment_id = uuid.uuid4()
    new_attachment_name = Path(f"{new_attachment_id}.{blob_attachment.filename.split('.')[-1]}")
    new_attachment_dir = STATIC_PAGES_CONFIG['IMAGE_DIR']

    blob_attachment.save(new_attachment_dir / new_attachment_name)

    return Response.response('post image success', {'image_id': new_attachment_id})


@static_pages_blueprints.route('/image', methods=['DELETE'])
def delete_image():
    """
    Delete image
    ---
    tags:
      - STATIC PAGE
    parameters:
      - name: image_id
        in: query
        required: true
        schema:
        type: string
    responses:
      200:
        description: Return the image id
      400:
        description: Missing image id in args
    """
    if 'image_id' not in request.args:
        return Response.client_error('no image id in args')

    image_path = search_files(STATIC_PAGES_CONFIG['IMAGE_DIR'], request.args['image_id'])

    if image_path is None:
        return Response.response('delete image success', {'image_id': request.args['image_id']})

    os.remove(image_path)
    return Response.response('delete image success', {'image_id': request.args['image_id']})


@static_pages_blueprints.route('/attachment', methods=['GET'])
def get_attachment():
    """
    Get attachment
    ---
    tags:
      - STATIC PAGE
    parameters:
      - name: attachment_id
        in: query
        required: true
        schema:
        type: string
    responses:
        200:
          description: Return the attachment
        400:
          description: Missing attachment id in args
        404:
          description: Attachment not found
    """
    if 'attachment_id' not in request.args:
        return Response.client_error('no attachment id in args')

    attachment_path = search_files(STATIC_PAGES_CONFIG['ATTACHMENT_DIR'], request.args['attachment_id'])

    if attachment_path is None:
        return Response.not_found('attachment not found')

    return send_file(attachment_path, as_attachment=True)


@static_pages_blueprints.route('/attachment', methods=['POST'])
def post_attachment():
    """
    Post attachment
    ---
    tags:
      - STATIC PAGE
    parameters:
      - name: blob_attachment
        in: formData
        required: true
        schema:
        type: file
    responses:
      200:
        description: Return the attachment id
      400:
        description: Missing blob attachment
    """
    if 'blob_attachment' not in request.files:
        return Response.client_error('no blob attachment')

    blob_attachment = request.files['blob_attachment']
    new_attachment_id = uuid.uuid4()
    new_attachment_name = Path(f"{new_attachment_id}.{blob_attachment.filename.split('.')[-1]}")
    new_attachment_dir = STATIC_PAGES_CONFIG['ATTACHMENT_DIR']

    blob_attachment.save(new_attachment_dir / new_attachment_name)

    return Response.response('post attachment success', {'attachment_id': new_attachment_id})


@static_pages_blueprints.route('/attachment', methods=['DELETE'])
def delete_attachment():
    """
    Delete attachment
    ---
    tags:
      - STATIC PAGE
    parameters:
      - name: attachment_id
        in: query
        required: true
        schema:
        type: string
    responses:
      200:
        description: Return the attachment id
      400:
        description: Missing attachment id in args
    """
    if 'attachment_id' not in request.args:
        return Response.client_error('no attachment id in args')

    attachment_path = search_files(STATIC_PAGES_CONFIG['ATTACHMENT_ID'], request.args['attachment_id'])

    if attachment_path is None:
        return Response.response('delete attachment success', {'attachment_id': request.args['attachment_id']})

    os.remove(attachment_path)
    return Response.response('delete attachment success', {'attachment_id': request.args['attachment_id']})


def search_files(directory, filename):
    files = os.listdir(directory)
    for file in files:
        if file.split('.')[0] == filename:
            return os.path.join(directory, file)
    return None
