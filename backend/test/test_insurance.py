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


insurance_ids = []


def test_create_insurance_success(client):
    json_payload = {
        "application_date": "2024-01-01T00:00:00",
        "incident_date": "2024-01-01T00:00:00",
        "name": "name",
        "student_id": "112000000",
        "id_number": "A123456789",
        "address": "address",
        "phone_number": "phone_number",
        "email": "email",
        "claim_details": "claim_details",
        "payment_type": "payment_type",
        "location": "location",
        "incident_cause": "incident_cause",
        "receipt": "receipt",
        "diagnosis_certificate": "diagnosis_certificate",
        "bankbook": 1,
        "x_ray": 1,
        "application_amount": 100,
        "claim_amount": 100,
        "claim_date": "2024-01-01T00:00:00",
        "remarks": "remarks",
        "insurance_company_stamp": True
    }

    for i in range(5):
        response = client.post('/api/insurance', json=json_payload)

        assert response.status_code == 201
        payload = response.get_json()

        assert 'message' in payload
        assert 'data' in payload
        assert 'id' in payload['data']
        assert "application_date" in payload['data']
        assert "incident_date" in payload['data']
        assert "name" in payload['data']
        assert "student_id" in payload['data']
        assert "id_number" in payload['data']
        assert "address" in payload['data']
        assert "phone_number" in payload['data']
        assert "email" in payload['data']
        assert "claim_details" in payload['data']
        assert "payment_type" in payload['data']
        assert "location" in payload['data']
        assert "incident_cause" in payload['data']
        assert "receipt" in payload['data']
        assert "diagnosis_certificate" in payload['data']
        assert "bankbook" in payload['data']
        assert "x_ray" in payload['data']
        assert "application_amount" in payload['data']
        assert "claim_amount" in payload['data']
        assert "claim_date" in payload['data']
        assert "remarks" in payload['data']
        assert "insurance_company_stamp" in payload['data']
        assert 'updated_time' in payload['data']
        assert 'created_time' in payload['data']

        global insurance_ids
        insurance_ids.append(payload['data']['id'])


def test_get_insurance_success(client):
    for insurance_id in insurance_ids:
        response = client.get(f'/api/insurance/{insurance_id}')

        assert response.status_code == 200
        payload = response.get_json()

        assert 'message' in payload
        assert 'data' in payload
        assert 'id' in payload['data']

        assert "application_date" in payload['data']
        assert "incident_date" in payload['data']
        assert "name" in payload['data']
        assert "student_id" in payload['data']
        assert "id_number" in payload['data']
        assert "address" in payload['data']
        assert "phone_number" in payload['data']
        assert "email" in payload['data']
        assert "claim_details" in payload['data']
        assert "payment_type" in payload['data']
        assert "location" in payload['data']
        assert "incident_cause" in payload['data']
        assert "receipt" in payload['data']
        assert "diagnosis_certificate" in payload['data']
        assert "bankbook" in payload['data']
        assert "x_ray" in payload['data']
        assert "application_amount" in payload['data']
        assert "claim_amount" in payload['data']
        assert "claim_date" in payload['data']
        assert "remarks" in payload['data']
        assert "insurance_company_stamp" in payload['data']

        assert 'updated_time' in payload['data']
        assert 'created_time' in payload['data']


def test_get_insurance_success(client):
    response = client.get(f'/api/insurance')

    assert response.status_code == 200
    payload = response.get_json()

    assert 'message' in payload
    assert 'data' in payload
    assert len(payload['data']) == len(insurance_ids)

    for data in payload['data']:
        assert 'id' in data
        assert "application_date" in data
        assert "incident_date" in data
        assert "name" in data
        assert "student_id" in data
        assert "id_number" in data
        assert "address" in data
        assert "phone_number" in data
        assert "email" in data
        assert "claim_details" in data
        assert "payment_type" in data
        assert "location" in data
        assert "incident_cause" in data
        assert "receipt" in data
        assert "diagnosis_certificate" in data
        assert "bankbook" in data
        assert "x_ray" in data
        assert "application_amount" in data
        assert "claim_amount" in data
        assert "claim_date" in data
        assert "remarks" in data
        assert "insurance_company_stamp" in data
        assert 'updated_time' in data
        assert 'created_time' in data


def test_put_restaurant_success(client):
    json_payload = {
        "application_date": "2024-01-01T00:00:00",
        "incident_date": "2024-01-01T00:00:00",
        "name": "test name",
        "student_id": "test 112000000",
        "id_number": "test A123456789",
        "address": "test address",
        "phone_number": "test phone_number",
        "email": "test email",
        "claim_details": "test claim_details",
        "payment_type": "test payment_type",
        "location": "test location",
        "incident_cause": "test incident_cause",
        "receipt": "test receipt",
        "diagnosis_certificate": "test diagnosis_certificate",
        "bankbook": 1,
        "x_ray": 1,
        "application_amount": 100,
        "claim_amount": 100,
        "claim_date": "2024-01-01T00:00:00",
        "remarks": "remarks",
        "insurance_company_stamp": True
    }

    for insurance_id in insurance_ids:
        response = client.patch(f'/api/insurance/{insurance_id}', json=json_payload)

        assert response.status_code == 204


def test_delete_post_success(client):
    for insurance_id in insurance_ids:
        response = client.delete(f'/api/insurance/{insurance_id}')

        assert response.status_code == 204
