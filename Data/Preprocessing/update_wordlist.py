import os
import json
from preprocess import start_preprocessing

RAW_WORDLIST_TXT = "words_alpha.txt" # source: https://github.com/dwyl/english-words/blob/master/words_alpha.txt
WORDLE_WORDLIST_TXT = "./words.txt" # source: https://gist.github.com/scholtes/94f3c0303ba6a7768b47583aff36654d#file-wordle-la-txt
BASE_WORDLIST_JSON = "../words.json" 

ALLOWED_GUESSES_JSON = "test/words.json" # words that can be guessed but not necessarily  the solution
TARGET_WORDS_JSON = "test/target_words.json"   # words that can be the solution

def load_wordlist_json(path: str)-> any:
    try:
        with open(path, "r") as f:
            return json.load(f)
    except Exception as e:
        print(f"Failed to load JSON from {path}: {e}")
        return {}

def load_wordlist_txt(path: str)-> list:
    try:
        with open (path, "r") as f:
            return [line.strip() for line in f.readlines()]
    except Exception as e:
        print(f"Failed to load TXT from {path}: {e}")
        return []

def get_unique_words(baseWordlist: list, newWordlist: list):
    return list( set(newWordlist) - set(baseWordlist) )
    
    

# Ensure last line ends with a newline to prevent formatting issues
def is_last_char_newline(filePath: str)-> bool:
    if os.path.exists(filePath) and os.path.getsize(filePath) > 0 :
        with open(filePath, "rb") as f:
            f.seek(-1,2)
            last_char = f.read(1).decode("utf-8")
            return last_char == "\n"
    else:
        print(f"Confirming newline existance failed: {filePath} doesn\'t Exist")

def extend_raw_wordlist(newWords: list, filePath: str):
    with open (filePath, 'a') as f:
        if not is_last_char_newline(filePath):
            f.write("\n")
        f.writelines(f"{line}\n" for line in newWords)

        

if __name__ == "__main__":

    if os.path.exists(RAW_WORDLIST_TXT):
        start_preprocessing(RAW_WORDLIST_TXT, ALLOWED_GUESSES_JSON, )
    else:
        print("Base Wordlist doesn't exist.")
        exit(1)


    base_wordlist = load_wordlist_json(BASE_WORDLIST_JSON)
    new_wordlist = load_wordlist_txt(WORDLE_WORDLIST_TXT)

    if base_wordlist and new_wordlist :
        new_words = get_unique_words(base_wordlist, new_wordlist)
        if new_words:
            extend_raw_wordlist(new_words,RAW_WORDLIST_TXT )

    start_preprocessing(WORDLE_WORDLIST_TXT, TARGET_WORDS_JSON, as_list=True )



