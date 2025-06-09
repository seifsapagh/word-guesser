from collections import defaultdict

from preprocess import jsonify
RAW_WORDLIST = "./words_alpha.txt"
WORDLE_LENGTHS = {
    5: "./words.txt"
}

count = 0
wordle_wordlist = defaultdict(list)
for file in  WORDLE_LENGTHS :
    with open(WORDLE_LENGTHS[file], 'r') as f:
        wordle_wordlist[file] = [line.strip() for line in f.readlines() ]

wordlist = defaultdict(int)
target_wordlist = defaultdict(list)
with open(RAW_WORDLIST, 'r') as f: 
    for line in f:
        word = line.strip()
        if len(word)>=3 and len(word)<=7 :
            if len(word) not in WORDLE_LENGTHS:
                target_wordlist[len(word)].append(word)
            wordlist[word] = 1
        
            

for length in wordle_wordlist:
    target_wordlist[length] = wordle_wordlist[length]




jsonify(wordlist,'../words.json')
jsonify(target_wordlist,'../target_words.json')


counts = defaultdict(int)
for word in wordlist:
    counts[len(word)] += 1

print("wordlist",counts)

counts = defaultdict(int)
for word in target_wordlist:
    counts[word] += len(target_wordlist[word])

print("target_wordlist",counts)
    
