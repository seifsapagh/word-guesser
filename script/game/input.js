import { ALLOWED_INPUT, MAX_LETTERS, MAX_ROWS } from "../constants.js";
import { checkExistance, checkResults } from "./validator.js";
import { state } from "../state.js";
import {triggerShakeAnimation, showMessage, styleLetters} from "../utils/style.js";

export function handleKeyInput(e){
    let key = (e.key.length == 1) ? e.key.toLowerCase() : e.key;
    
    if(!state.game_on || !Object.hasOwn( ALLOWED_INPUT,key ) ) return; 
    
    let running_row = document.querySelectorAll(".guess-row")[state.current_row];
    let letter_boxes = running_row.querySelectorAll("*");

    if( state.current_letter == MAX_LETTERS && key == "Enter"){

        // check if word exists in word list
        if (!checkExistance(letter_boxes)){
            triggerShakeAnimation(running_row);
            showMessage("Not in word list");
            return;
        }

        // if user entered the correct word, win
        let win = checkResults(letter_boxes);
        if(win){
            state.game_on = false;
            return
        }

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

    // Adding user input unless it's a backspace or enter
    if(key != "Backspace" && key != "Enter"){
        if(state.current_letter < MAX_LETTERS){
            letter_boxes[++state.current_letter].innerHTML = key;
        }
    }


    if(key == "Backspace"){
        if(state.current_letter >= 0){
            letter_boxes[state.current_letter].innerHTML = "";
            state.current_letter --;
        }
    }

    styleLetters(letter_boxes, letter_boxes[state.current_letter]);

}

