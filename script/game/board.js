import {settings, updateSettings} from "../state.js";

let row_node = {
    tag: "div",
    attributes : {
        class : "guess-row"
    }
};

let letter_node  = {
    tag: "div",
    attributes : {
        class : "letter-box"
    }
};

let board_container = document.querySelector(".user-tries");


function createElementFromJSON(node){
    let element = document.createElement(node.tag);
    for(const[attr,value] of Object.entries(node.attributes)){
        element.setAttribute(attr,value);
    }

    return element;
}

function resetBoard(){
    board_container.innerHTML="";
}

export function updateBoard(num_guesses=null, word_length=null ){
    resetBoard();
    num_guesses ??=  settings.max_guesses;
    word_length ??=  settings.word_length;
    updateSettings(num_guesses, word_length);

    for(let i =0; i< num_guesses; i++){
        let row_box = createElementFromJSON(row_node);
        
        for(let j=0; j< word_length; j++){
            let letter_box = createElementFromJSON(letter_node);
            row_box.appendChild(letter_box);
        }

        board_container.appendChild(row_box);
    }

}