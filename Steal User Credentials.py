import base64
import json
import time

import requests

s = requests.Session()

r = s.post(
    'http://43.241.202.47:3003/rest/user/login',
    data=json.dumps({
        "email": 'a1644290@student.adelaide.edu.au',
        "password": 'qwerty',
    }),
    headers={'Content-type': 'application/json;charset=utf-8'},
)

print("Login:", r)


s.headers.update({'Authorization': "Bearer " + json.loads(r.text)['authentication']['token']})

r = s.get('http://43.241.202.47:3003/rest/user/authentication-details/')  # TODO better URL to use it on?

print(r.text)

for user in json.loads(r.text)['data']:
    print(user)


r = s.get("http://43.241.202.47:3003/api/Users/1")

print(r)
print(r.text)