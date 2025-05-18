import{DEFAULT_WORD_LENGTH, DICTOONARY_PATH} from "../constants.js";

export async function loadDictionary(word_length= DEFAULT_WORD_LENGTH) {
    const response = await fetch("./"+DICTOONARY_PATH);
    const dictionaryObj = await response.json();
    return dictionaryObj[word_length];
}

export async function loadWordList(){
    const response = await fetch("./Data/words.json");
    const wordListObj  = await response.json();
    return wordListObj;
}

export function pickRandomWord(dictionary){
    return dictionary[Math.floor( Math.random() * dictionary.length )];
}