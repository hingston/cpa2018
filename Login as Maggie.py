import base64
import hashlib
import json

import requests

# Maggie.Simpson@simpsonmail.com
email = "Maggie.Simpson@googlemail.com"


def encode(string):
    return base64.b64encode(string.encode('utf-8')).decode("utf-8")


s = (encode("H4hgvh5GvG5lkcbo") + ":" + encode(email))
s = s.encode('utf-8')

hash_object = hashlib.md5(s)
hex_dig = hash_object.hexdigest()

r = requests.post(
    'http://43.241.202.47:3003/rest/user/login',
    data=json.dumps({
        "email": "Maggie.Simpson@simpsonmail.com",
        "password": hex_dig,
    }),
    headers={'Content-type': 'application/json;charset=utf-8'},
)

print("Base64 before hashing:", s)
print("Hash:", hex_dig)
print("Status code:", r.status_code)
