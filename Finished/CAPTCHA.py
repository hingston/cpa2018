import json
import time
from multiprocessing.pool import ThreadPool

import requests

s = requests.Session()
solved_captchas = []


def get_captchas(num):
    for __ in range(num):
        r = s.get('http://43.241.202.47:3003/rest/captcha/')
        r_json = json.loads(r.text)
        solved_captchas.append(json.dumps({
            "captcha": str(eval(r_json['captcha'])),
            "comment": "Quick math!",
            "rating": 3,
            "captchaId": str(r_json['captchaId'])
        }))


def submit_captchas(data):
    r = s.post(
        'http://43.241.202.47:3003/api/Feedbacks/',
        data=data,
        headers={'Content-type': 'application/json'},
    )
    if r.status_code != 201:
        print("Failed:", r.status_code, "Data:", data)


get_captchas(10)

print("Starting send")
start = time.time()
with ThreadPool(len(solved_captchas)) as p:
    p.map(submit_captchas, solved_captchas)
end = time.time()
print("Finished send")
print("Time elapsed (ms):", (end - start) * 1000)
