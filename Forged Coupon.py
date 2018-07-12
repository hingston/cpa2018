import json
from hashlib import md5
from base64 import b64decode
from base64 import b64encode
from Crypto import Random
from Crypto.Cipher import AES
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

# print("Login:", r)

s.headers.update({'Authorization': "Bearer " + json.loads(r.text)['authentication']['token']})

wrong = s.put('http://43.241.202.47:3003/rest/basket/73/coupon/094a72cf8c9d64bb8f4bf37616650802')
print(wrong.status_code)


print(wrong.text)


print(len('73d18881deab6985d893cbe87c4b9986'))

key = '9FB770DDD50687E3F06928C2BE18E58301293B6A45969FDB89A8BA28B535533E'
IV = 16* '\x00'           # Initialization vector: discussed later
mode = AES.MODE_CBC
encryptor = AES.new(key, mode, IV=IV)

text = 'JAN16-20'
ciphertext = encryptor.encrypt(text)


print("ciphertext",ciphertext)