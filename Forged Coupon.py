import json
from hashlib import md5
from base64 import b64decode
from base64 import b64encode
from Crypto import Random
from Crypto.Cipher import AES
import base64
import hashlib
from Crypto import Random
from Crypto.Cipher import AES
import requests

s = requests.Session()

r = s.post(
    'http://43.241.202.47:3003/rest/user/login',
    data=json.dumps({
        "email": 'example@example.com',
        "password": 'example',
    }),
    headers={'Content-type': 'application/json;charset=utf-8'},
)

print("Login:", r)

s.headers.update({'Authorization': "Bearer " + json.loads(r.text)['authentication']['token']})

wrong = s.put('http://43.241.202.47:3003/rest/basket/73/coupon/e74d7c0de21e72aaffc8f2eef2bdb7c1')
print(wrong.status_code)
print(wrong.text)



class AESCipher(object):

    def __init__(self, key):
        print(key)
        self.bs = 16
        self.key = hashlib.sha256(key.encode()).digest()

    def encrypt(self, raw):
        new_raw = self._pad(raw).encode("utf8")
        print(new_raw)
        iv = Random.new().read(AES.block_size)
        cipher = AES.new(self.key, AES.MODE_CTR, iv)
        return base64.b64encode(iv + cipher.encrypt(new_raw))

    def decrypt(self, enc):
        enc = base64.b64decode(enc)
        iv = enc[:AES.block_size]
        cipher = AES.new(self.key, AES.MODE_CTR, iv)
        return self._unpad(cipher.decrypt(enc[AES.block_size:])).decode('utf-8')

    def _pad(self, s):
        return s + (self.bs - len(s) % self.bs) * chr(self.bs - len(s) % self.bs)

    @staticmethod
    def _unpad(s):
        return s[:-ord(s[len(s)-1:])]


test = AESCipher('myTotalySecretKey')
print(test.encrypt('bacon'))# = be8acf13ec1a9dc9f20cda75661c5bd1


import binascii
import os
from Crypto.Cipher import AES
from Crypto.Util import Counter
def int_of_string(s):
    return int(binascii.hexlify(iv), 16)
def encrypt_message(key, plaintext):
    iv = os.urandom(16)
    ctr = Counter.new(128, initial_value=int_of_string(iv))
    aes = AES.new(key, AES.MODE_CTR, counter=ctr)
    return iv + aes.encrypt(plaintext)
def decrypt_message(key, ciphertext):
    iv = ciphertext[:16]
    ctr = Counter.new(128, initial_value=int_of_string(iv))
    aes = AES.new(key, AES.MODE_CTR, counter=ctr)
    return aes.decrypt(ciphertext[16:])



from Crypto.Cipher import AES
# Encryption
encryption_suite = AES.new('myTotalySecretKey', AES.MODE_CTR)
cipher_text = encryption_suite.encrypt("bacon")
print('enc',cipher_text)
# Decryption
decryption_suite = AES.new('myTotalySecretKey',  AES.MODE_CTR)
plain_text = decryption_suite.decrypt(cipher_text)

print('plain',plain_text)