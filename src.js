const MAX_ROWS = 4;
const MAX_LETTERS = 4;

// Game State
let word_length;
let game_on = false;
let WORD = "";
let current_row = 0;
let current_letter = -1;
let guess_rows = document.querySelectorAll(".guess-row");
let row = guess_rows[current_row];
row.classList.add("running");
let letters = row.querySelectorAll("*");

// Data
let word_list ;
let dict;


function ResetGame(){
    // Reset UI
    guess_rows.forEach(row => {
        row.classList.remove("running", "finished");
        row.querySelectorAll(".letter-box").forEach(letter=>{
            letter.textContent ="";
            letter.className = "letter-box";
        });
    });

    // Reset game state
    current_row = 0;
    current_letter = -1;
    
    // Setup first row
    guess_rows = document.querySelectorAll(".guess-row");
    row = guess_rows[current_row];
    row.classList.add("running");
    letters = row.querySelectorAll("*");
    
    WORD=  pickRandomWord(dict);
    game_on= true;

}

async function initGame(){
    // load dictionary
    dict = await loadDictionary();
    word_list = await loadWordList();
    addVirtualKeyboard();
    // Reset
    ResetGame();
    if (WORD)
        game_on = true;
}


// Data Loading
async function loadDictionary(word_length = 5) {
    const response = await fetch("./Data/lengths_words.json");
    const dictionaryObj = await response.json();
    return dictionaryObj[word_length];
}

async function loadWordList(){
    const response = await fetch("./Data/words.json");
    const wordListObj  = await response.json();
    return wordListObj;
}

function pickRandomWord(DICTIONARY){
    return DICTIONARY[
        Math.floor(
            Math.random() * DICTIONARY.length
        )
]
}


// users can only enter English Letters or delete or Submit their guess
const ALLOWED_INPUT = {
    // Letters
    "a": "a", "b": "b", "c": "c", "d": "d", "e": "e", "f": "f", "g": "g", "h": "h", "i": "i", 
    "j": "j", "k": "k", "l": "l", "m": "m", "n": "n", "o": "o", "p": "p", "q": "q", "r": "r", 
    "s": "s", "t": "t", "u": "u", "v": "v", "w": "w", "x": "x", "y": "y", "z": "z",

    // Special keys
    "Backspace": "Backspace",  
    "Enter": "Enter"
};



// highlight current letter box
function styleLetters(letters, curLetter){
    letters.forEach(letter=>{
        if(letter !== curLetter){
            letter.classList.remove("curLetter");
        }
    });

    if(current_letter >= 0)
        curLetter.classList.add("curLetter");
}


function triggerShakeAnimation(row){
    row.classList.add("shake");
    setTimeout(()=>{
        row.classList.remove("shake");
    }, 500);
}

function showMessage(msg, duration=1.2){
    let message_box = document.querySelector(".game>.message");
    message_box.classList.remove("hidden");
    message_box.textContent = msg;
    setTimeout(()=>{
        message_box.classList.add("hidden");
    }, duration*1000);
}






// check if word exists in word list
function checkExistance(letters){
    let user_input = "";
    letters.forEach(letter=>{
        user_input += letter.textContent;
    });
    if(!word_list[user_input]){
        return false;
    }

    return true;
}



// Test User input against our chosen word and highlight each letter accordingly.
function checkResults(letters){
    let i= 0;
    let result = true;

    letters.forEach(letter=>{
        letter.classList.add("finished");
        if(letter.textContent == WORD[i]){
            letter.classList.add("right");
        }else if (letter.textContent != WORD[i] &&  WORD.includes( letter.textContent)  ){
            letter.classList.add("misplaced");
            result = false;
        }else{
            letter.classList.add("wrong");
            result= false;
        }
        i++;
    });
    return result;
}


document.addEventListener("keyup", e=>{

    let key = (e.key.length == 1) ? e.key.toLowerCase() : e.key;
    
    
    if(!game_on || !Object.hasOwn( ALLOWED_INPUT,key ) ) return; 
    

    if( current_letter == MAX_LETTERS && key == "Enter"){

        // check if word exists in word list
        if (!checkExistance(letters)){
            triggerShakeAnimation(guess_rows[current_row]);
            showMessage("Not in word list");
            return;
        }

        // if user entered the correct word, win
        let win = checkResults(letters);
        if(win){
            game_on = false;
            return
        }

        // Resetting / Updating for new Guess try if maximum guesses not reached
        if (current_row < MAX_ROWS){

            current_row ++;
            row = guess_rows[current_row];
            row.classList.add("running");
            letters = row.querySelectorAll("*");
            current_letter = -1;
            return

        }else{
            game_on = false;
            setTimeout(()=>{alert(`the word was ${WORD}!`);}, 500); // show result after the 0.5 seconds it takes for flip animation to end.
        }
    }

    // Adding user input unless it's a backspace or enter
    if(key != "Backspace" && key != "Enter"){
        if(current_letter < MAX_LETTERS){
            letters[++current_letter].innerHTML = key;
        }
    }


    if(key == "Backspace"){
        if(current_letter >= 0){
            letters[current_letter].innerHTML = "";
            current_letter --;
        }
    }

    styleLetters(letters, letters[current_letter]);

});

// new game button
let restart_game_btn = document.querySelector(".new-game-btn");
restart_game_btn.addEventListener("click", e=>{
    ResetGame();
});



function addVirtualKeyboard(){
    let keyboard_box = document.querySelector(".keyboard");
    let keyboard_layout = 
    [
        [..."qwertyuiop"] ,
        [..."asdfghjkl"] ,
        ["del",..."zxcvbnm","enter"]
    ];
    
    let passed = false

    keyboard_layout.forEach(row=>{

        let row_div = document.createElement("div");
        row_div.classList.add("keyboard-row");

        row.forEach(key=>{
            let key_div = document.createElement("div");
            key_div.classList.add("key");
            key_div.textContent = key;
            if(key==" "){
                key_div.textContent =(passed)? "Enter": "Del";
                passed = true;
            }
            row_div.appendChild(key_div);
        });

        keyboard_box.appendChild(row_div);
    });

    addKeyboardFunctionality();
}
function addKeyboardFunctionality(){
    let keys = document.querySelectorAll(".key");
    keys.forEach(key=>{
        key.addEventListener("click", e=>{
            let char = key.textContent.toUpperCase();
            let key_code = char.charCodeAt(0);
            let code = `Key${char}`;
            
            if(char == "ENTER"){
                char = "Enter";
                code = "Enter";
                key_code = 13;
            }
            
            if (char == "DEL"){
                char = "Backspace";
                code = "Backspace";
                key_code = 8;
            }
            
            const keyEvent = new KeyboardEvent("keyup",{
                key    : char,
                code   : code,
                keyCode: key_code,
                which  : key_code,
                bubbles: true
            });

            document.dispatchEvent(keyEvent);
        });
    });
}




// Start the Game when page Loads
window.addEventListener('DOMContentLoaded', initGame);
    