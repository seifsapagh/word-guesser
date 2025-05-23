import { ALLOWED_INPUT, MAX_LETTERS, MAX_ROWS } from "../constants.js";
import { checkExistance, checkResults } from "./validator.js";
import { state } from "../state.js";
import {triggerShakeAnimation, showMessage, styleLetters} from "../utils/style.js";
import {pressVirtualKey} from "./keyboard.js";


function normalizeKey(key){
    return (key.length == 1) ? key.toLowerCase() : key;
}

function isValidInput(key){
    return Object.hasOwn( ALLOWED_INPUT,key ); 
}

function insertLetter(letter_boxes, letter){
    if(state.current_letter < MAX_LETTERS){
        letter_boxes[++state.current_letter].innerHTML = letter;
    }
}

function deleteLetter(letter_boxes){
    if(state.current_letter >= 0){
        letter_boxes[state.current_letter].innerHTML = "";
        state.current_letter --;
    }
}

function handleSubmitGuess(letter_boxes, running_row){
    // check if word exists in word list
    if (!checkExistance(letter_boxes)){
        triggerShakeAnimation(running_row);
        showMessage("Not in word list");
    }else{
        // if user entered the correct word, win
        let win = checkResults(letter_boxes);
        if(win){
            state.game_on = false;
        }else{
            advanceRow(running_row)
        }
    }

}

function advanceRow(running_row){
      // Resetting / Updating for new Guess try if maximum guesses not reached
    if (state.current_row < MAX_ROWS){
        running_row.classList.remove("running");
        state.current_row ++;
        running_row = document.querySelectorAll(".guess-row")[state.current_row]
        running_row.classList.add("running");

        state.current_letter = -1;
        return

    }else{
        state.game_on = false;
        setTimeout(()=>{alert(`the word was ${state.word}!`);}, 500); // show result after the 0.5 seconds it takes for flip animation to end.
    }
}


export function handleKeyInput(e){
    let key = normalizeKey(e.key)
    
    if(!state.game_on || !isValidInput(key) ) return; 

    pressVirtualKey(key);

    let running_row = document.querySelectorAll(".guess-row")[state.current_row];
    let letter_boxes = running_row.querySelectorAll("*");

    if(state.current_letter == MAX_LETTERS && key == "Enter" ){
        handleSubmitGuess(letter_boxes, running_row);
    }else if(key == "Backspace"){
        deleteLetter(letter_boxes);
    }
    else if(key !== "Enter"){
        insertLetter(letter_boxes,key)
    }
    
    styleLetters(letter_boxes, letter_boxes[state.current_letter]);

}

