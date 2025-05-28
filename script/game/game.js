import {state} from "../state.js";
import {loadWordList, loadDictionary, pickRandomWord} from "../utils/data.js";
import {showOverlay, hideOverlay, overlay_content, celebrate, showMessage, hideMessage, playAudio, failSound,stopAudio} from "../utils/style.js";
import {addVirtualKeyboard } from "./keyboard.js";


export function ResetGame(){
    // Reset game state
    state.current_row = 0;
    state.current_letter = -1;
    // update target word
    state.word=  pickRandomWord(state.dict);
    
    // Reset UI

    let guess_rows = document.querySelectorAll(".guess-row");
    guess_rows.forEach(row => {
        row.classList.remove("running", "finished");
        row.querySelectorAll(".letter-box").forEach(letter=>{
            letter.textContent ="";
            letter.className = "letter-box";
        });
    });
    guess_rows[state.current_row].classList.add("running"); // highlight first guess row

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
    state.dict = await loadDictionary();
    state.word_list = await loadWordList();

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
    restart_game_btn.classList.add("shake-attention");
}



let restart_game_btn = document.querySelector(".btn-new-game");
restart_game_btn.addEventListener("click", ()=>{
    restart_game_btn.classList.remove("shake-attention");

    restart_game_btn.classList.add("rotate");

    restart_game_btn.addEventListener('animationend', ()=>{
        restart_game_btn.classList.remove("rotate");
    }, {once: true});

    ResetGame();
});

let guide_btn = document.querySelector(".btn-guide")
document.addEventListener("click",e=>{
    if (!guide_btn.contains(e.target) && !overlay_content.contains(e.target)){
        hideOverlay();
    }
})

guide_btn.addEventListener("click", ()=>{
    showOverlay()
});