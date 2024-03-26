from app import app
from pathlib import Path
from werkzeug.datastructures import FileStorage


# no problem section
def test_connection():
    client = app.test_client()
    response = client.get('/')
    assert response.status_code == 200
    assert response.json == {"description": "connect success", "response": None}


def test_get_allow_endswith():
    client = app.test_client()
    response = client.get('/api/posts/allow_endswith')
    assert response.status_code == 200
    assert response.json == {
        "description": "get allow success",
        "response": [
            '.png', '.jpg', '.jpeg', '.doc', '.docx', '.ppt', '.pptx', '.pdf', '.xls', '.xlsx', '.csv', '.odt'
        ]}


# start testing attachment flow
def test_delete_all_post():
    client = app.test_client()
    response = client.delete('/api/posts/post')
    assert response.status_code == 200
    assert response.json == {"description": "delete all post success", "response": None}


attachment_ids = []


def test_post_attachment():
    testing_files = Path('tests/statics/testing_upload_file').glob('*')
    client = app.test_client()
    for file in testing_files:
        file_data = {'blob_attachment': FileStorage(stream=open(file, 'rb'), filename=file.name)}
        response = client.post('/api/posts/attachment', data=file_data, content_type='multipart/form-data')
        response_info = response.json['response']
        assert response.status_code == 200
        assert response.json['description'] == 'post attachment success'
        for key in ['attachment_id', 'attachment_name', 'attachment_url', 'attachment_info']:
            assert key in response_info
        attachment_ids.append(response_info['attachment_id'])


def test_get_attachment():
    client = app.test_client()
    for attachment_id in attachment_ids:
        response = client.get(f'/api/posts/attachment?attachment_id={attachment_id}')
        assert response.status_code == 200


def test_get_attachment_info():
    client = app.test_client()
    for attachment_id in attachment_ids:
        response = client.get(f'/api/posts/attachment_info?attachment_id={attachment_id}')
        response_info = response.json['response']
        assert response.status_code == 200
        assert response.json['description'] == 'get attachment info success'
        for key in ['create_time', 'id', 'name', 'update_time']:
            assert key in response_info


def test_delete_attachment():
    client = app.test_client()
    for attachment_id in attachment_ids:
        response = client.delete(f'/api/posts/attachment?attachment_id={attachment_id}')
        assert response.status_code == 200
        assert response.json['description'] == 'delete attachment success'


# stop testing attachment flow

# start testing post flow
post_ids = []
post_columns = []


def test_post_post():
    client = app.test_client()
    data_1 = {
        "title": "test title",
        "content": "test content",
        "column": "activity",
        "attachments": '[1,2,3,4,5]'
    }
    data_2 = {
        "title": "test title",
        "content": "test content",
        "column": "health",
        "attachments": '[1,2,3,4,5]'
    }
    data_3 = {
        "title": "test title",
        "content": "test content",
        "column": "restaurant",
        "attachments": '[1,2,3,4,5]'
    }
    data_4 = {
        "title": "test title",
        "content": "test content",
        "column": "nutrition",
        "attachments": '[1,2,3,4,5]'
    }

    for data in [data_1, data_2, data_3, data_4]:
        for time in range(20):
            response = client.post('/api/posts/post', data=data)
            response_info = response.json['response']

            assert response.json['description'] == 'post post success'
            assert response.status_code == 200
            for key in [
                'id', 'title', 'content', 'column', 'attachments', 'visible', 'importance', 'create_time', 'update_time'
            ]:
                post_ids.append(response_info['id'])
                post_columns.append(response_info['column'])
                assert key in response_info


def test_update_post():
    client = app.test_client()

    for post_id, post_column in zip(post_ids, post_columns):
        response = client.put(f'/api/posts/post', data={
            'id': post_id, 'title': f'title_{post_id}', 'content': f'content_{post_id}', 'column': post_column,
            'attachments': '[0,1,2]', 'visible': '1', 'importance': '1' if int(post_id) % 10 == 0 else '0'
        })
        response_info = response.json['response']
        assert response.status_code == 200
        assert response.json['description'] == 'update post success'
        for key in [
            'id', 'title', 'content', 'column', 'attachments', 'visible', 'importance', 'create_time', 'update_time'
        ]:
            assert key in response_info


def test_update_post_importance():
    client = app.test_client()
    for post_id in post_ids:
        if int(post_id) % 10 == 0:
            response = client.put(f'/api/posts/post_importance', data={
                'id': post_id,
                'importance': '1',
            })
            response_info = response.json['response']

            assert response.status_code == 200
            assert response.json['description'] == 'update importance success'
            for key in ['id', 'importance']:
                assert key in response_info


def test_get_post():
    client = app.test_client()
    for post_id in post_ids:
        response = client.get(f'/api/posts/post?id={post_id}')
        response_info = response.json['response']
        assert response.status_code == 200
        assert response.json['description'] == 'get post success'
        for key in [
            'id', 'title', 'content', 'column', 'attachments', 'visible', 'importance', 'create_time', 'update_time'
        ]:
            assert key in response_info

    for column in ['activity', 'health', 'restaurant', 'nutrition']:
        response = client.get(f'/api/posts/post?column={column}')
        assert response.status_code == 200
        assert response.json['description'] == 'get post success'
        assert len(response.json['response']['posts']) == 10
        assert response.json['response']['posts'][1]['importance'] == '1'

    response = client.get(f'/api/posts/post')
    assert response.status_code == 200
    assert response.json['description'] == 'get post success'
    assert len(response.json['response']['posts']) == 10
    assert response.json['response']['posts'][7]['importance'] == '1'


def test_delete_post():
    client = app.test_client()
    for post_id in post_ids:
        response = client.delete(f'/api/posts/post?id={post_id}')
        assert response.status_code == 200
        assert response.json['description'] == 'delete post success'
