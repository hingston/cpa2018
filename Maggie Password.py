import base64
import json
import sys
from multiprocessing.pool import ThreadPool

import requests
import hashlib
# Maggie.Simpson@simpsonmail.com
email = "Maggie.Simpson@googlemail.com"


def encode(str):
    return base64.b64encode(str.encode('utf-8')).decode("utf-8")


str = (encode("H4hgvh5GvG5lkcbo") + ":" + encode(email))
str = str.encode('utf-8')

hash_object = hashlib.sha512(str)
hex_dig = hash_object.hexdigest()
print(hash_object)
print(hex_dig)

print(str.decode("utf-8"))

r = requests.post(
    'http://43.241.202.33:3003/rest/user/login',
    data=json.dumps({
        "email": "Maggie.Simpson@simpsonmail.com",
        "password": hex_dig,
    }),
    headers={'Content-type': 'application/json;charset=utf-8'},
)

print(r)
