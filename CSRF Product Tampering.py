import json

import requests

headers = {
    'Content-type': 'application/json;charset=utf-8',
    'Content-Length': '350'
}
data = {"id": 9, "name": "Squishee",
        "description": 'Madeentirelyoutofsyrup.<ahref="https://youtu.be/10mWf671EGU"target="_blank">More...</a>',
        "price": 10, "image": "squisheee.jpg"}
data_json = json.dumps(data)
r = requests.put(
    'http://43.241.202.33:3003/api/Products/9',
    data=data_json,
    headers=headers,
)

print(r.status_code, r.url)
