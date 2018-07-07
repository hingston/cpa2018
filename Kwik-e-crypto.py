import requests

r = requests.get("http://43.241.202.47:3003/#/tokensale-ico-ek")

print(r.text)