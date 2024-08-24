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


building_ids = []


def test_create_building_success(client):
    json_payload = {
        "name": "column",
        "user_id": 1
    }

    for i in range(5):
        response = client.post('/api/building', json=json_payload)
        payload = response.get_json()

        assert response.status_code == 201

        assert 'message' in payload
        assert 'data' in payload
        assert 'id' in payload['data']
        assert 'name' in payload['data']
        assert 'user_id' in payload['data']
        assert 'updated_time' in payload['data']
        assert 'created_time' in payload['data']

        global building_ids
        building_ids.append(payload['data']['id'])


def test_get_building_success(client):
    for building_id in building_ids:
        response = client.get(f'/api/building/{building_id}')
        payload = response.get_json()
        assert response.status_code == 200


def test_get_buildings_success(client):
    response = client.get('/api/building')
    payload = response.get_json()

    assert response.status_code == 200

    assert 'message' in payload
    assert 'data' in payload
    assert len(payload['data']) == 5


def test_patch_building_success(client):
    for building_id in building_ids:
        json_payload = {
            "name": "test column",
            "user_id": 1
        }

        response = client.patch(f'/api/building/{building_id}', json=json_payload)
        assert response.status_code == 204


def test_delete_building_success(client):
    for building_id in building_ids:
        response = client.delete(f'/api/building/{building_id}')
        assert response.status_code == 204
