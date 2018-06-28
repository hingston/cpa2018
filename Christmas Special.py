import json
import sys

import requests
s = requests.Session()


failed = 0

for i in range(20):


    r = s.get('http://43.241.202.33:3003/api/Products/'+str(i)+'?d=Thu%20Jun%2028%202018'  )
    #if r.status_code == 200:
    print(i, r.status_code,r.url)
