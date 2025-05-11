const MAX_ROWS = 4;
const MAX_LETTERS = 4;

// setting up the game
let game_on = false;

let WORD = "";
let current_row = 0;
let current_letter = -1;
let guess_rows = document.querySelectorAll(".guess-row");
let row = guess_rows[current_row];
row.classList.add("running");
let letters = row.querySelectorAll("*");


function ResetGame(){
    game_on= false;

    WORD = "";
    current_row = 0;
    current_letter = -1;
    guess_rows = document.querySelectorAll(".guess-row");
    row = guess_rows[current_row];
    row.classList.add("running");
    letters = row.querySelectorAll("*");
    

    // Reset Rows And Letters Styles
    guess_rows.forEach(row => {
        row.classList.remove("running", "finished");
        row.querySelectorAll(".letter-box").forEach(letter=>{
            letter.textContent ="";
            letter.className = "letter-box";
        });
    });
}

function initGame(){
    // Reset
    ResetGame();
    // load dictionary
    let dict = loadDictionary()
    // pick a random word
    WORD=  pickRandomWord(dict);
    game_on = true;
    
}


function loadDictionary(){
   return [
        "apple", "beach", "brain", "bread", "break", "brick", "chair", "chest", 
        "chord", "click", "clock", "cloud", "crane", "dance", "diary", "drink", 
        "earth", "flame", "fleet", "fruit", "ghost", "grape", "grass", "happy", 
        "heart", "house", "juice", "light", "money", "music", "party", "piano", 
        "plant", "radio", "river", "salad", "sheep", "shirt", "sugar", "sword", 
        "table", "toast", "tiger", "train", "water", "whale", "wheel", "woman", 
        "world", "write", "zebra", "angel", "badge", "cable", "daisy", "eagle", 
        "fairy", "giant", "honey", "igloo", "jelly", "koala", "lemon", "mango", 
        "noble", "olive", "pearl", "queen", "raven", "saint", "tulip", "umbra", 
        "vivid", "wheat", "yacht", "zesty", "amber", "bliss", "crisp", "dizzy", 
        "ember", "fluff", "glide", "hover", "inbox", "jumpy", "kinky", "lucky", 
        "mirth", "nifty", "optic", "pluck", "quirk", "rover", "sunny", "twist", 
        "ultra", "vixen", "wacky", "yummy", "zippy"
    ];

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

// console.log(WORD);

document.addEventListener("keyup", e=>{
    
    
    if(!game_on || !Object.hasOwn( ALLOWED_INPUT,e.key ) ) return; 
    

    if( current_letter == MAX_LETTERS && e.key == "Enter"){
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
            console.log(WORD);
            setTimeout(()=>{alert(`the word was ${WORD}!`);}, 500); // show result after the 0.5 seconds it takes for flip animation to end.
        }
    }

    // Adding user input unless it's a backspace or enter
    if(e.key != "Backspace" && e.key != "Enter"){
        if(current_letter < MAX_LETTERS){
            letters[++current_letter].innerHTML = e.key;
        }
    }


    if(e.key == "Backspace"){
        if(current_letter >= 0){
            letters[current_letter].innerHTML = "";
            current_letter --;
        }
    }

    styleLetters(letters, letters[current_letter]);

});

// Start The Game
initGame();
    