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


download_ids = []


def test_create_download_success(client):
    with open('test/statics/100-mb-example-jpg.jpg', 'rb') as f:
        file_data = f.read()

    data = {
        'title': 'test title',
        'column': 'test column',
        'visibility': False,
    }

    for i in range(5):
        data['file'] = (io.BytesIO(file_data), 'test/statics/100-mb-example-jpg.jpg')
        response = client.post('/api/download', content_type='multipart/form-data', data=data)
        payload = response.get_json()

        assert response.status_code == 201
        assert 'message' in payload
        assert 'data' in payload
        assert 'id' in payload['data']
        assert 'title' in payload['data']
        assert 'column' in payload['data']
        assert 'visibility' in payload['data']
        assert 'updated_time' in payload['data']
        assert 'created_time' in payload['data']

        global download_ids
        download_ids.append(payload['data']['id'])


def test_patch_download(client):
    with open('test/statics/100-mb-example-jpg.jpg', 'rb') as f:
        file_data = f.read()

    data = {
        'title': 'change title',
        'column': 'change column',
        'visibility': True,
    }

    for download_id in download_ids:
        data['file'] = (io.BytesIO(file_data), 'test/statics/100-mb-example-jpg.jpg')
        response = client.patch(f'/api/download/{download_id}', content_type='multipart/form-data', data=data)
        assert response.status_code == 204


def test_get_download_info(client):
    for download_id in download_ids:
        response = client.get(f'/api/download/{download_id}/info')

        assert response.status_code == 200
        payload = response.get_json()

        assert 'message' in payload
        assert 'data' in payload
        assert 'id' in payload['data']
        assert 'title' in payload['data']
        assert 'column' in payload['data']
        assert 'visibility' in payload['data']
        assert 'updated_time' in payload['data']
        assert 'created_time' in payload['data']


def test_get_downloads(client):
    response = client.get('/api/download')

    assert response.status_code == 200
    payload = response.get_json()

    assert 'message' in payload
    assert 'data' in payload
    assert len(payload['data']) == len(download_ids)


def test_get_download(client):
    for download_id in download_ids:
        response = client.get(f'/api/download/{download_id}')
        assert response.status_code == 200


def test_delete_download(client):
    for download_id in download_ids:
        response = client.delete(f'/api/download/{download_id}')
        assert response.status_code == 204
