from app import app
from pathlib import Path
from werkzeug.datastructures import FileStorage


# no problem section
def test_connection():
    client = app.test_client()
    response = client.get('/')
    assert response.status_code == 200
    assert response.json == {"description": "connect success", "response": None}


# start testing attachment flow
