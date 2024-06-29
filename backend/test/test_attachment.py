import pytest
from app import create_app
import io
from models.database import db


@pytest.fixture
def client():
    app = create_app(status='testing')
    with app.test_client() as client:
        yield client


attachment_id = None


def test_create_item_success(client):
    with open('test/statics/100MB-TESTFILE.ORG.pdf', 'rb') as f:
        file_data = f.read()

    data = {
        'file': (io.BytesIO(file_data), '100MB-TESTFILE.ORG.pdf')
    }
    response = client.post('/api/attachment', content_type='multipart/form-data', data=data)
    assert response.status_code == 201
    payload = response.get_json()

    assert 'message' in payload
    assert 'data' in payload
    assert 'id' in payload['data']
    assert 'filepath' in payload['data']
    assert 'filename' in payload['data']
    assert 'updated_time' in payload['data']
    assert 'created_time' in payload['data']

    global attachment_id
    attachment_id = payload['data']['id']


def test_get_item_info(client):
    response = client.get(f'/api/attachment/{attachment_id}/info')

    assert response.status_code == 200
    payload = response.get_json()

    assert 'message' in payload
    assert 'data' in payload
    assert 'id' in payload['data']
    assert 'filepath' in payload['data']
    assert 'filename' in payload['data']
    assert 'updated_time' in payload['data']
    assert 'created_time' in payload['data']


def test_get_item(client):
    response = client.get(f'/api/attachment/{attachment_id}')
    assert response.status_code == 200


def test_delete_item_info(client):
    response = client.delete(f'/api/attachment/{attachment_id}')
    assert response.status_code == 204
