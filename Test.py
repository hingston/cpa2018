import requests

r = requests.get("http://43.241.202.33:3003/rest/product/search?q=TEST", timeout=10)

print(r, r.text)

r = requests.get("http://43.241.202.33:3003/rest/product/search?q='))--", timeout=10)

print(r, r.text)
