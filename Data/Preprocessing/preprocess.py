import json

INPUT_FILE = "words_alpha.txt"
WORDS_JSON_PATH = "../words.json"
LENGTHS_JSON_PATH = "../lengths_words.json"
MIN_WORD_LENGTH = 3


def jsonify(data: dict, file_path: str )-> None:
    print(f"Exporting {file_path} ")
    with open(file_path,"w") as f:
        json.dump(data, f, indent=4 );

def start_preprocessing(file_path: str)-> None:

    with open(file_path, "r") as file:
        
        words_by_length = {}
        words_json = {}
        
        for line in file:
            word = line.strip()
            # Add words of lengths larger than 3 
            if word and len(word) >= MIN_WORD_LENGTH :
                words_json[word] = 1
                if len(word) in words_by_length:
                    words_by_length[len(word)].append(word)
                else:
                    words_by_length[len(word)] = [word]

        
        # Print total words and total of each length
        print(f"A total of {len(words_json)} words have been added")

        for length in sorted(words_by_length):
            print(f"length {length:<2} Added: {len(words_by_length[length]) :>6} ")
    
    jsonify(words_json,WORDS_JSON_PATH)
    jsonify(words_by_length,LENGTHS_JSON_PATH)

if __name__ == "__main__":
    start_preprocessing(INPUT_FILE)
