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


restaurant_ids = []


def test_create_restaurant_success(client):
    json_payload = {
        "attachments": [
            "attachment1",
            "attachment2",
            "attachment3"
        ],
        "category": "category",
        "inspected_time": "2024-01-01T00:00:00.000000",
        "item": "item",
        "title": "title",
        "valid": True,
        "visibility": True
    }

    for i in range(5):
        response = client.post('/api/restaurant', json=json_payload)

        assert response.status_code == 201
        payload = response.get_json()

        assert 'message' in payload
        assert 'data' in payload
        assert 'id' in payload['data']
        assert 'attachments' in payload['data']
        assert 'category' in payload['data']
        assert 'inspected_time' in payload['data']
        assert 'item' in payload['data']
        assert 'title' in payload['data']
        assert 'valid' in payload['data']
        assert 'visibility' in payload['data']
        assert 'updated_time' in payload['data']
        assert 'created_time' in payload['data']

        global restaurant_ids
        restaurant_ids.append(payload['data']['id'])


def test_get_restaurant_success(client):
    for restaurant_id in restaurant_ids:
        response = client.get(f'/api/restaurant/{restaurant_id}')

        assert response.status_code == 200
        payload = response.get_json()

        assert 'message' in payload
        assert 'data' in payload
        assert 'id' in payload['data']
        assert 'attachments' in payload['data']
        assert 'category' in payload['data']
        assert 'inspected_time' in payload['data']
        assert 'item' in payload['data']
        assert 'title' in payload['data']
        assert 'valid' in payload['data']
        assert 'visibility' in payload['data']
        assert 'updated_time' in payload['data']
        assert 'created_time' in payload['data']


def test_get_restaurants_success(client):
    response = client.get(f'/api/restaurant')

    assert response.status_code == 200
    payload = response.get_json()

    assert 'message' in payload
    assert 'data' in payload
    assert len(payload['data']) == len(restaurant_ids)
    assert 'id' in payload['data'][0]
    assert 'attachments' in payload['data'][0]
    assert 'category' in payload['data'][0]
    assert 'inspected_time' in payload['data'][0]
    assert 'item' in payload['data'][0]
    assert 'title' in payload['data'][0]
    assert 'valid' in payload['data'][0]
    assert 'visibility' in payload['data'][0]
    assert 'updated_time' in payload['data'][0]
    assert 'created_time' in payload['data'][0]


def test_put_restaurant_success(client):
    json_payload = {
        "attachments": [
            "attachment1",
            "attachment2",
            "attachment3"
        ],
        "category": "category",
        "inspected_time": "2024-01-01T00:00:00.000000",
        "item": "item",
        "title": "title",
        "valid": True,
        "visibility": True
    }

    for restaurant_id in restaurant_ids:
        response = client.patch(f'/api/restaurant/{restaurant_id}', json=json_payload)

        assert response.status_code == 204


def test_delete_post_success(client):
    for restaurant_id in restaurant_ids:
        response = client.delete(f'/api/restaurant/{restaurant_id}')

        assert response.status_code == 204
