with open("wordlist.txt") as f:
    words = f.readlines()
# you may also want to remove whitespace characters like `\n` at the end of each line
words = [x.strip() for x in words]


#content.sort()



#content.sort(key=len, reverse=True)
"""
for line in content:
    if len(line) >= 9:
        print(line)
"""
"""
for line1 in content:
    for line2 in content:
        if line2.startswith(line1):
            if line1 != line2:
                print(line1, line2)




import requests

s = requests.session()

for word in content:
    url = "http://43.241.202.47:3003/restroom/"+word
    r = s.get(url, allow_redirects=False)

    if r.status_code != 500:
        print(r.status_code,url)
        
"""

import json
import string
from multiprocessing.pool import ThreadPool

import requests




def test_words(word):
    global found
    #if not found:
    if s.get('http://43.241.202.47:3003/' + word).text != wrong:

        found.append(word)
    else:
        global failed
        failed = failed + 1
        if failed % 1000 == 0:
            print(str(failed) + "/" + str(total) + " = " + str(round(failed / total * 100.0, 2)) + "%")


found = []
failed = 0
total = len(words)

s = requests.Session()

wrong= s.get("http://43.241.202.47:3003/test/").text




print("Total:", total)

with ThreadPool(10) as p:
    p.map(test_words, words)

if found:
    #print(str(failed) + "/" + str(total) + " = " + str(round(failed / total * 100.0, 2)) + "%")
    for word in found:
        print('Found at: http://43.241.202.47:3003/' +word )
else:
    print('None found!')
