import base64

import js2py

encoded = b'KGZ1bmN0aW9uICgpIHsNCiAgICB2YXIgTCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykNCiAgICB2YXIgRCA9IEwuc2hpZnQoKQ0KICAgIHJldHVybiBMLnJldmVyc2UoKS5tYXAoZnVuY3Rpb24gKEMsIEEpIHsNCiAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKEMgLSBEIC0gNDUgLSBBKQ0KICAgIH0pLmpvaW4oJycpDQogIH0pKDI1LCAxODQsIDE3NCwgMTc5LCAxODIsIDE4NikgKyAoMzY2NjkpLnRvU3RyaW5nKDM2KS50b0xvd2VyQ2FzZSgpICsgKGZ1bmN0aW9uICgpIHsNCiAgICAgIHZhciBUID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKQ0KICAgICAgdmFyIE0gPSBULnNoaWZ0KCkNCiAgICAgIHJldHVybiBULnJldmVyc2UoKS5tYXAoZnVuY3Rpb24gKG0sIEgpIHsNCiAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUobSAtIE0gLSAyNCAtIEgpDQogICAgICB9KS5qb2luKCcnKQ0KICAgIH0pKDEzLCAxNDQsIDg3LCAxNTIsIDEzOSwgMTQ0LCA4MywgMTM4KSArICgyMCkudG9TdHJpbmcoMzYpLnRvTG93ZXJDYXNlKCk='
js = base64.b64decode(encoded).decode("utf-8")
result = js2py.eval_js(js)
print("KwikECoin URL: http://43.241.202.47:3003/#/" + result)





js2 = """
 encodeURIComponent((new Date).toDateString())).then(function(e) {
                t.resolve(e.data.data)
"""

result = js2py.eval_js(js2)
print( result)