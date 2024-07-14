import io
import pytest
from app import create_app
from models.database import db


@pytest.fixture(scope='module')
def client():
    app = create_app(status='testing')
    with app.app_context():
        db.create_all()
        yield app.test_client()
        db.drop_all()


carousel_ids = []


def test_create_carousel_success(client):
    with open('test/statics/100-mb-example-jpg.jpg', 'rb') as f:
        file_data = f.read()

    data = {
        'title': 'test title',
        'content': 'test content',
        'visibility': False,
        'image': None
    }

    for i in range(5):
        data['image'] = (io.BytesIO(file_data), 'test/statics/100-mb-example-jpg.jpg')
        response = client.post('/api/carousel', content_type='multipart/form-data', data=data)

        assert response.status_code == 201
        payload = response.get_json()

        assert 'message' in payload
        assert 'data' in payload
        assert 'id' in payload['data']
        assert 'title' in payload['data']
        assert 'content' in payload['data']
        assert 'visibility' in payload['data']
        assert 'filepath' in payload['data']
        assert 'updated_time' in payload['data']
        assert 'created_time' in payload['data']

        global carousel_ids
        carousel_ids.append(payload['data']['id'])


def test_get_carousel_info_success(client):
    for attachment_id in carousel_ids:
        response = client.get(f'/api/carousel/{attachment_id}/info')

        assert response.status_code == 200
        payload = response.get_json()

        assert 'message' in payload
        assert 'data' in payload
        assert 'id' in payload['data']
        assert 'title' in payload['data']
        assert 'content' in payload['data']
        assert 'visibility' in payload['data']
        assert 'filepath' in payload['data']
        assert 'updated_time' in payload['data']
        assert 'created_time' in payload['data']


def test_get_carousel_success(client):
    for attachment_id in carousel_ids:
        response = client.get(f'/api/carousel/{attachment_id}')

        assert response.status_code == 200


def test_get_carousels_success(client):
    response = client.get(f'/api/carousel')

    assert response.status_code == 200
    payload = response.get_json()

    assert 'message' in payload
    assert 'data' in payload
    assert len(payload['data']) == len(carousel_ids)


def test_put_carousel_success(client):
    with open('test/statics/100-mb-example-jpg.jpg', 'rb') as f:
        file_data = f.read()

    data = {
        'title': 'test put title',
        'content': 'test put content',
        'visibility': True,
        'image': None
    }

    for carousel_id in carousel_ids:
        data['image'] = (io.BytesIO(file_data), '100-mb-example-jpg.jpg')
        response = client.put(f'/api/carousel/{carousel_id}', content_type='multipart/form-data', data=data)

        assert response.status_code == 204


def test_delete_carousel_success(client):
    for carousel_id in carousel_ids:
        response = client.delete(f'/api/carousel/{carousel_id}')
        assert response.status_code == 204
