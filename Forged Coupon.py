import json

import requests

s = requests.Session()

r = s.post(
    'http://43.241.202.47:3003/rest/user/login',
    data=json.dumps({
        "email": 'a1644290@student.adelaide.edu.au',
        "password": 'qwerty',
    }),
    headers={'Content-type': 'application/json;charset=utf-8'},
)

print("Login:", r)

s.headers.update({'Authorization': "Bearer " + json.loads(r.text)['authentication']['token']})

r = s.put('http://43.241.202.47:3003/rest/basket/73/coupon/test')

print(r.text)

print("Error: error:0606506D:digital envelope routines:EVP_DecryptFinal_ex:wrong final block length\n at Decipher.final (internal/crypto/cipher.js:104:26)\n at Cryptr.decrypt (/opt/kwik-e-mart/node_modules/cryptr/index.js:34:59)\n at Object.exports.discountFromCoupon.coupon [as discountFromCoupon] (/opt/kwik-e-mart/lib/insecurity.js:65:36)\n at /opt/kwik-e-mart/routes/coupon.js:8:33\n at Layer.handle [as handle_request] (/opt/kwik-e-mart/node_modules/express/lib/router/layer.js:95:5)\n at next (/opt/kwik-e-mart/node_modules/express/lib/router/route.js:137:13)\n at Route.dispatch (/opt/kwik-e-mart/node_modules/express/lib/router/route.js:112:3)\n at Layer.handle [as handle_request] (/opt/kwik-e-mart/node_modules/express/lib/router/layer.js:95:5)\n at /opt/kwik-e-mart/node_modules/express/lib/router/index.js:281:22\n at param (/opt/kwik-e-mart/node_modules/express/lib/router/index.js:354:14)\n at param (/opt/kwik-e-mart/node_modules/express/lib/router/index.js:365:14)\n at param (/opt/kwik-e-mart/node_modules/express/lib/router/index.js:365:14)\n at Function.process_params (/opt/kwik-e-mart/node_modules/express/lib/router/index.js:410:3)\n at next (/opt/kwik-e-mart/node_modules/express/lib/router/index.js:275:10)\n at /opt/kwik-e-mart/routes/verify.js:124:3\n at Layer.handle [as handle_request] (/opt/kwik-e-mart/node_modules/express/lib/router/layer.js:95:5)\n at trim_prefix (/opt/kwik-e-mart/node_modules/express/lib/router/index.js:317:13)\n at /opt/kwik-e-mart/node_modules/express/lib/router/index.js:284:7\n at Function.process_params (/opt/kwik-e-mart/node_modules/express/lib/router/index.js:335:12)\n at next (/opt/kwik-e-mart/node_modules/express/lib/router/index.js:275:10)\n at /opt/kwik-e-mart/node_modules/express-jwt/lib/index.js:44:7\n at Object.module.exports.verify (/opt/kwik-e-mart/node_modules/express-jwt/node_modules/jsonwebtoken/index.js:59:3)")
