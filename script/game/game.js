import {settings, state} from "../state.js";
import {loadWordList, loadDictionary, pickRandomWord} from "../utils/data.js";
import {celebrate, showMessage, hideMessage, playAudio, failSound,stopAudio} from "../utils/style.js";
import {addVirtualKeyboard} from "./keyboard.js";

import {updateBoard} from './board.js';
import { DEFAULT_WORD_LENGTH, DEFAULT_NUM_GUESSES } from "../constants.js";


export function ResetGame(){

    // Reset game state
    state.current_row = 0;
    state.current_letter = 0;
    // update target word
    state.word=  pickRandomWord(state.dict[settings.word_length]);
    
    // Reset UI

    let guess_rows = document.querySelectorAll(".guess-row");
    guess_rows.forEach(row => {
        row.classList.remove("running", "finished");
        row.querySelectorAll(".letter-box").forEach(letter=>{
            letter.textContent ="";
            letter.className = "letter-box";
        });
    });

    // set input row and put it back into view
    let running_row = guess_rows[state.current_row]
    running_row.classList.add("running"); 
    running_row.scrollIntoView({block: "end"});

    // Reset Keyboard UI
    let keyboard = document.querySelectorAll(".virtual-key");
    if(keyboard){
        keyboard.forEach(key=>{
            key.classList.remove("right","wrong","misplaced");
        }); 
        // no need to reset position feedback text since it's hidden unless the letter is correct
    }

    hideMessage();
    stopAudio();
    // only start when a target word is picked
    if (state.word){
        state.game_on = true;
    }

}

export async function initGame(){
    // load dictionary
    state.dict = await loadDictionary();        // to pick random word
    state.word_list = await loadWordList();     // to validate user input against 

    updateBoard(DEFAULT_NUM_GUESSES, DEFAULT_WORD_LENGTH);  
    addVirtualKeyboard();

    ResetGame();
}

export function handleGameEnd(result){
    state.game_on = false;
    if (result === 'win'){
        showMessage(`Well Done`,0,true);
        celebrate();
    }else if (result === 'lose'){
        playAudio(failSound);
        showMessage(`word was ${state.word.toUpperCase()}`,0,true);
    }
    let restart_game_btn = document.querySelector(".btn-new-game")
    restart_game_btn.classList.add("shake-attention");
}