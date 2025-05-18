import {state} from "../state.js";
import {loadWordList, loadDictionary, pickRandomWord} from "../utils/data.js";
import {addVirtualKeyboard } from "./keyboard.js";


export function ResetGame(){
    // Reset game state
    state.current_row = 0;
    state.current_letter = -1;
    // update target word
    state.word=  pickRandomWord(state.dict);
    
    // Reset UI
    let guess_rows = document.querySelectorAll(".guess-row");
    guess_rows[state.current_row].classList.add("running"); // highlight first guess row

    guess_rows.forEach(row => {
        row.classList.remove("running", "finished");
        row.querySelectorAll(".letter-box").forEach(letter=>{
            letter.textContent ="";
            letter.className = "letter-box";
        });
    });

    // Reset Keyboard UI
    let keyboard = document.querySelectorAll(".key");
    if(keyboard){
        keyboard.forEach(key=>{
            key.classList.remove("right","wrong","misplaced");
        });
    }

    if (state.word){
        console.log(state.word);
        state.game_on = true;
    }

}

export async function initGame(){
    // load dictionary
    state.dict = await loadDictionary();
    state.word_list = await loadWordList();
    addVirtualKeyboard();
    // Reset
    ResetGame();
    
}



let restart_game_btn = document.querySelector(".new-game-btn");
restart_game_btn.addEventListener("click", e=>{
    ResetGame();
});
