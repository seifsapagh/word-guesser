import { ALLOWED_INPUT } from "../constants.js";
import { checkExistance, checkResults } from "./validator.js";
import { state, settings } from "../state.js";
import { triggerShakeAnimation, showMessage } from "../utils/style.js";
import { pressVirtualKey } from "./keyboard.js";
import { handleGameEnd } from "./game.js";


function normalizeKey(key){
    return (key.length == 1) ? key.toLowerCase() : key;
}

function isValidInput(key, keyCode){
    /*  keyCode is consistent acrosss layouts and is language independant
        check if key pressed is a letter or enter(13) or backspace(8)
        then check key against ALLOWED_INPUT which has actual key value for english letters
    */
    if(((keyCode <= 90 && keyCode >=65 )||keyCode == 13 || keyCode == 8)){
        if(! Object.hasOwn( ALLOWED_INPUT,key ))
        showMessage("Please use English letters.")
    }
    return Object.hasOwn( ALLOWED_INPUT,key ); 
}

function insertLetter(letter_boxes, letter){
    if(state.current_letter < settings.word_length){
        letter_boxes[state.current_letter++].textContent = letter;
    }
}

function deleteLetter(letter_boxes){
    if(state.current_letter > 0){
        state.current_letter --;
        letter_boxes[state.current_letter].textContent = "";
    }
}

function handleSubmitGuess(letter_boxes, running_row){
    // check if word exists in word list
    if (!checkExistance(letter_boxes)){
        triggerShakeAnimation(running_row);
        showMessage("Not in word list");
    }else{
        // if user entered the correct word, win
        let isGuessCorrect  = checkResults(letter_boxes);
        if( isGuessCorrect ){
            handleGameEnd('win');
        }else{
            advanceRow(running_row)
        }
    }

}


function advanceRow(running_row){
      // Resetting / Updating for new Guess try if maximum guesses not reached
    if (state.current_row < settings.max_guesses-1){
        running_row.classList.remove("running");
        state.current_row ++;
        running_row = document.querySelectorAll(".guess-row")[state.current_row]
        running_row.classList.add("running");
        state.current_letter = 0;
        running_row.scrollIntoView({block: "end"});
        return

    }else{
        handleGameEnd('lose')
    }
}


export function handleKeyInput(e){
    let key = normalizeKey(e.key)
    
    if(!state.game_on || !isValidInput(key,e.keyCode) ) return; 

    pressVirtualKey(key);

    let running_row = document.querySelectorAll(".guess-row")[state.current_row];
    let letter_boxes = running_row.querySelectorAll("*");

    if(state.current_letter == settings.word_length && key == "Enter" ){
        handleSubmitGuess(letter_boxes, running_row);
    }else if(key == "Backspace"){
        deleteLetter(letter_boxes);
    }
    else if(key !== "Enter"){
        insertLetter(letter_boxes,key)
    }

}

