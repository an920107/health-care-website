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


image_id = None


def test_create_image_success(client):
    with open('test/statics/100-mb-example-jpg.jpg', 'rb') as f:
        file_data = f.read()

    data = {
        'image': (io.BytesIO(file_data), '100-mb-example-jpg.jpg')
    }
    response = client.post('/api/image', content_type='multipart/form-data', data=data)

    assert response.status_code == 201
    payload = response.get_json()

    assert 'message' in payload
    assert 'data' in payload
    assert 'id' in payload['data']
    assert 'filepath' in payload['data']
    assert 'filename' in payload['data']
    assert 'updated_time' in payload['data']
    assert 'created_time' in payload['data']

    global image_id
    image_id = payload['data']['id']


def test_get_image(client):
    response = client.get(f'/api/image/{image_id}')
    assert response.status_code == 200


def test_delete_image(client):
    response = client.delete(f'/api/image/{image_id}')
    assert response.status_code == 204
