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


post_ids = []


def test_create_post_success(client):
    json_payload = {
        "attachments": [
            "attachments"
        ],
        "column": "column",
        "content": "content",
        "content_en": "content_en",
        "importance": True,
        "title": "title",
        "title_en": "title_en",
        "visibility": True
    }

    for i in range(5):
        response = client.post('/api/post', json=json_payload)

        assert response.status_code == 201
        payload = response.get_json()

        assert 'message' in payload
        assert 'data' in payload
        assert 'id' in payload['data']
        assert 'column' in payload['data']
        assert 'content' in payload['data']
        assert 'content_en' in payload['data']
        assert 'importance' in payload['data']
        assert 'title' in payload['data']
        assert 'title_en' in payload['data']
        assert 'attachments' in payload['data']
        assert 'updated_time' in payload['data']
        assert 'created_time' in payload['data']

        global post_ids
        post_ids.append(payload['data']['id'])


def test_get_post_success(client):
    for post_id in post_ids:
        response = client.get(f'/api/post/{post_id}')

        assert response.status_code == 200
        payload = response.get_json()

        assert 'message' in payload
        assert 'data' in payload
        assert 'id' in payload['data']
        assert 'column' in payload['data']
        assert 'content' in payload['data']
        assert 'content_en' in payload['data']
        assert 'importance' in payload['data']
        assert 'title' in payload['data']
        assert 'title_en' in payload['data']
        assert 'attachments' in payload['data']
        assert 'updated_time' in payload['data']
        assert 'created_time' in payload['data']


def test_get_posts_success(client):
    response = client.get(f'/api/post')

    assert response.status_code == 200
    payload = response.get_json()

    assert 'message' in payload
    assert 'data' in payload
    assert len(payload['data']) == len(post_ids)
    assert 'id' in payload['data'][0]
    assert 'column' in payload['data'][0]
    assert 'content' in payload['data'][0]
    assert 'content_en' in payload['data'][0]
    assert 'importance' in payload['data'][0]
    assert 'title' in payload['data'][0]
    assert 'title_en' in payload['data'][0]
    assert 'attachments' in payload['data'][0]
    assert 'updated_time' in payload['data'][0]
    assert 'created_time' in payload['data'][0]


def test_put_post_success(client):
    payload = {
        "attachments": [
            "attachments"
        ],
        "column": "test column",
        "content": "test content",
        "content_en": "test content_en",
        "importance": False,
        "title": "test title",
        "title_en": "test title_en",
        "visibility": False
    }

    for post_id in post_ids:
        response = client.patch(f'/api/post/{post_id}', json=payload)

        assert response.status_code == 204


def test_delete_post_success(client):
    for post_id in post_ids:
        response = client.delete(f'/api/post/{post_id}')

        assert response.status_code == 204
