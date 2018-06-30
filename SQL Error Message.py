import json

import requests

s = requests.Session()

data = {"email": "", "password": '', }
data_json = json.dumps(data)
headers = {
    'Content-type': 'application/json;charset=utf-8',
    'Referer': 'http://43.241.202.33:3003/',
}

r = s.post(
    'http://43.241.202.33:3003/rest/user/login',
    data=data_json,
    headers=headers,
)

print(r.text)
