import{DEFAULT_WORD_LENGTH, TARGET_WORDS_PATH, ALLOWED_WORDS_PATH} from "../constants.js";

export async function loadDictionary(word_length= DEFAULT_WORD_LENGTH) {
    const response = await fetch(TARGET_WORDS_PATH);
    const dictionaryObj = await response.json();
    return dictionaryObj;
}

export async function loadWordList(){
    const response = await fetch(ALLOWED_WORDS_PATH);
    const wordListObj  = await response.json();
    return wordListObj;
}

export function pickRandomWord(dictionary){
    return dictionary[Math.floor( Math.random() * dictionary.length )];
}