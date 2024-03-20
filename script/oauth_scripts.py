import requests


def get_oauth_access_token(code, state):
    url = ' https://portal.ncu.edu.tw/oauth2/token'
    headers = {
        'Accept': 'application/json',
        'Authorization': 'Basic MjAyNDAzMDUwMDUyMjJiamZzN3lENkNpd1Q6TFc2Nm4xVXY3d2hlNlY5QkxZU3J3YTBIRThmbVpldVhZV0d1N0FTVWNxWTRSUmcyYk54Mw=='
    }
    data = {
        'grant_type': 'authorization_code',
        'code': code,
        'state': state,
        'redirect_url': 'https://api.spuidspirit.com/health/rta',
    }

    response = requests.post(url, headers=headers, data=data)
    response = response.json()

    return response['access_token']


def get_user_info(access_token):
    url = 'https://portal.ncu.edu.tw/apis/oauth/v1/info'

    headers = {
        'Accept': 'application/json',
        'Authorization': f'Bearer {access_token}'
    }

    response = requests.get(url, headers=headers)
    response = response.json()

    return response
