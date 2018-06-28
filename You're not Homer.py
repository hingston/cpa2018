import json

import requests

data = {"message": "I'm not the real Homer", "author": "Homer@kwike.mart"}
data_json = json.dumps(data)
headers = {'Content-type': 'application/json;charset=utf-8',
           'X-User-Email': 'Homer@kwike.mart',
           'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0',
           'Referer': 'http://43.241.202.33:3003/',
           'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJzdWNjZXNzIiwiZGF0YSI6eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBrd2lrZS5tYXJ0IiwicGFzc3dvcmQiOiI3YzZhMTgwYjM2ODk2YTBhOGMwMjc4N2VlYWZiMGU0YyIsImNyZWF0ZWRBdCI6IjIwMTgtMDYtMjJUMjI6MDI6NTAuNDIzWiIsInVwZGF0ZWRBdCI6IjIwMTgtMDYtMjJUMjI6MDI6NTAuNDIzWiJ9LCJpYXQiOjE1MzAxODcwNDQsImV4cCI6MTUzMDIwNTA0NH0.TFcT-EOq-HZFZiPms0ByX2-Q_IiI-7e3XYv3_N9K3X9Bh56IHUhJ8TGoGslcYYd8s3pilddZ0aehFZtpE0L5Kk5nZePEQUNXmqXU41I3XZBltrUaMM89aGk2GNZFGBgDVq9R4qM688CKUEoTIC3Z1ZecW28L6iJtsahYQUO72Fg'
           }
cookies = {'io': 'zajAOf3mZ3wQrtoDAAGt',
           'cookieconsent_status': 'dismiss',
           'email': 'Homer%40kwike.mart',
           'token': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJzdWNjZXNzIiwiZGF0YSI6eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBrd2lrZS5tYXJ0IiwicGFzc3dvcmQiOiI3YzZhMTgwYjM2ODk2YTBhOGMwMjc4N2VlYWZiMGU0YyIsImNyZWF0ZWRBdCI6IjIwMTgtMDYtMjJUMjI6MDI6NTAuNDIzWiIsInVwZGF0ZWRBdCI6IjIwMTgtMDYtMjJUMjI6MDI6NTAuNDIzWiJ9LCJpYXQiOjE1MzAxODcwNDQsImV4cCI6MTUzMDIwNTA0NH0.TFcT-EOq-HZFZiPms0ByX2-Q_IiI-7e3XYv3_N9K3X9Bh56IHUhJ8TGoGslcYYd8s3pilddZ0aehFZtpE0L5Kk5nZePEQUNXmqXU41I3XZBltrUaMM89aGk2GNZFGBgDVq9R4qM688CKUEoTIC3Z1ZecW28L6iJtsahYQUO72Fg',
           }

r = requests.put('http://43.241.202.33:3003/rest/product/2/reviews',
                 data=data_json,
                 headers=headers,
                 cookies=cookies,
                 )

# if r.status_code == 200:
print(r.status_code, r.url)

print(r.headers)
