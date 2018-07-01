import random
from multiprocessing.pool import ThreadPool

import requests

s = requests.Session()

with open("./wordlist.txt") as f:
    names = f.readlines()
names = [x.strip() for x in names]


def check_name(id):
    r = s.post(
        'http://lolinactive.com/LoLInactive.php',
        data={"region": 'ru', "summonerName": random.choice(names)},
        headers={'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    )
    print(r.text)
    print(r)


for _ in range(100):
    with ThreadPool(20) as p:
        p.map(check_name, range(200))
