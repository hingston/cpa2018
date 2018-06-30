import json
from multiprocessing.pool import ThreadPool

import requests

s = requests.Session()
solved_captchas = []


def get_captchas(num):
    for i in range(num):
        r = s.get('http://43.241.202.33:3003/rest/captcha/')
        response = json.loads(r.text)
        data = {
            "captcha": str(eval(response['captcha'])),
            "comment": "zzz", "rating": 3,
            "captchaId": str(response['captchaId'])
        }
        solved_captchas.append(json.dumps(data))


def submit_captchas(data):
    headers = {'Content-type': 'application/json'}
    r = s.post(
        'http://43.241.202.33:3003/api/Feedbacks/',
        data=data,
        headers=headers,
    )
    print(data)
    print(r)


get_captchas(10)

with ThreadPool(len(solved_captchas)) as p:
    p.map(submit_captchas, solved_captchas)
