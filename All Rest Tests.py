import json

import requests



data = json.dumps({
    "UserId": 8,

})
r = requests.post(
    'http://43.241.202.47:3003/api/Users/\'--',
    data=data,
    headers={'Content-type': 'application/json'},
)



print(r)