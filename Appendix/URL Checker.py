from multiprocessing.pool import ThreadPool

import requests


def test_words(word):
    global found
    if s.get('http://43.241.202.47:3003/' + word).text != wrong:
        found.append(word)
    else:
        global failed
        failed = failed + 1
        if failed % 1000 == 0:
            print(str(failed) + "/" + str(total) + " = " + str(round(failed / total * 100.0, 2)) + "%")


with open("wordlist.txt") as f:
    words = f.readlines()

words = [x.strip() for x in words]
found = []
failed = 0
total = len(words)

s = requests.Session()

wrong = s.get("http://43.241.202.47:3003/test/").text

print("Total:", total)

with ThreadPool(10) as p:
    p.map(test_words, words)

if found:
    for word in found:
        print('URL found: http://43.241.202.47:3003/' + word)
else:
    print('None found!')
