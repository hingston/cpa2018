



import requests

r = requests.get("http://43.241.202.33:3003/rest/product/search?q=\"")

print(r,r.text)