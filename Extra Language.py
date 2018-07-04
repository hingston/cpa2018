import json
import string
import sys
from multiprocessing.pool import ThreadPool

import requests


def generate_locales():
    locales = []
    letters = list(string.ascii_lowercase)

    temp = []

    for letterA in letters:
        for letterB in letters:
            temp.append(letterA + letterB + "_")
            for letterC in letters:
                temp.append(letterA + letterB + letterC + "_")
                # print(letterA+letterB+letterC+"_")

    for t in temp:
        for letterA in letters:
            for letterB in letters:
                locales.append(t + (letterA + letterB).upper())
                # print(t+(letterA+letterB).upper())

    print("temp", len(temp))
    print("locales", len(locales))
    ignore_locales = ["ar_SA", "cs_CZ", "da_DK", "de_DE", "el_GR", "es_ES", "et_EE", "fi_FI", "fr_FR", "he_IL", "hi_IN",
                      "hu_HU", "id_ID", "it_IT", "ja_JP", "lt_LT", "lv_LV", "my_MM", "nl_NL", "no_NO", "pl_PL", "pt_PT",
                      "pt_BR", "ro_RO", "ru_RU", "sv_SE", "tr_TR", "ur_PK", "zh_CN", "zh_HK", "en"]
    print("ignore", len(ignore_locales))

    final = list(set(locales) - set(ignore_locales))

    total = len(final)
    print("final", total)
    return final


def test_locale(locale):
    global failed
    # global start_time
    try:
        json.loads(s.get('http://43.241.202.47:3003/i18n/' + locale + '.json').text)
        # print(locale.replace('-', '_'), r)
        print(locale)

        print(str(failed) + "/" + str(total) + " = " + str(round(failed / total * 100.0, 2)) + "%")
        sys.exit()
    except ValueError:
        failed = failed + 1
        if failed % 100 == 0:
            print(str(failed) + "/" + str(total) + " = " + str(round(failed / total * 100.0, 2)) + "%")

            # elapsed = time.time() - start_time
            # start_time = time.time()
            # print("Seconds per 1000:", elapsed)
            # print("Time to complete:", elapsed * (total / 1000))


failed = 0
total = 0
all_locales = generate_locales()
s = requests.Session()
# start_time = time.time()
with ThreadPool(200) as p:
    p.map(test_locale, all_locales)
