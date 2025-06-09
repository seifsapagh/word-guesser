import os
import json
from collections import defaultdict

WORD_LENGTH = 5

def jsonify(data: dict, filePath: str )-> None:
    print(f"JSONifying {filePath:>30}")
    try:

        directory = os.path.dirname(filePath)
        # Create directory, skip if file is to be created in current directory
        if directory:
            os.makedirs(directory, exist_ok=True)

        with open(filePath,"w") as f:
            json.dump(data, f, indent=4 )

        print(f"{filePath:<30} JSONified Successfully ")

    except Exception as e:
        print(f"An error occurred while exporting to {filePath}: {e}")

def start_preprocessing(rawFilePath: str, exportPath, exportLengths: bool = False, as_list: bool = False)-> None:
    print(f"\tStarted Processing {rawFilePath:>30}")

    directory = os.path.dirname(exportPath)
    filename = os.path.basename(exportPath)

    with open(rawFilePath, "r") as file:

        words_set = set()
        if exportLengths:
            words_by_length = defaultdict(list)
            stats = defaultdict(int)
            lengths_export_path = os.path.join(directory, "lengths_" + filename)
        
        for line in file:
            word = line.strip()
            # Add words of lengths larger than 3 
            if word and len(word) >= 3  and  len(word) <= 7:
                words_set.add(word)
                if exportLengths:
                    words_by_length[len(word)].append(word)
                    stats[len(word)] +=1

    # Print total words and total of each length
    print(f"A total of {len(words_set)} words have been Extracted from {rawFilePath}")
    if as_list :
        jsonify(list(words_set), exportPath)
    else:
        words_json = {word:1 for word in words_set}
        jsonify(words_json, exportPath)

    if exportLengths:
        # for length in sorted(words_by_length):
        #     print(f"length {length:<2} Added: {len(words_by_length[length]) :>6} ")
        # add counts to lengths json
        words_by_length["counts"] = stats
        jsonify(words_by_length , lengths_export_path)

    print(f"\t{rawFilePath:<30} Processing End\n")
    
