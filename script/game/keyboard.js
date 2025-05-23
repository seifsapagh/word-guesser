import {handleKeyInput} from "./input.js";
let keyboard_box = document.querySelector(".keyboard");

export function addVirtualKeyboard(){
    let keyboard_layout = 
    [
        [..."qwertyuiop"] ,
        [..."asdfghjkl"] ,
        ["Backspace",..."zxcvbnm","Enter"]
    ];
    
    keyboard_layout.forEach(row=>{

        let row_div = document.createElement("div");
        row_div.classList.add("keyboard-row");

        row.forEach(key=>{

            let key_content = (key == "Backspace") ? "Del" : key ;

            let virtual_key = document.createElement("div");
            virtual_key.classList.add("virtual-key");
            virtual_key.dataset.letter = key
            virtual_key.textContent = key_content;
            if(!["enter","del"].includes(key)){
                let position = document.createElement("div");
                position.classList.add("position-feedback");
                virtual_key.appendChild(position);
            }

            row_div.appendChild(virtual_key);

            
        });

        keyboard_box.appendChild(row_div);
    });

    addKeyboardFunctionality();
}

export function addKeyboardFunctionality(){
    let keys = document.querySelectorAll(".virtual-key");
    keys.forEach(key=>{
        key.addEventListener("click", e=>{
            let keyboard_key = key.dataset.letter;
            handleKeyInput({key: keyboard_key});
        });
    });
}


export function pressVirtualKey(keyboard_key){

    let virtual_key = keyboard_box.querySelector(`.virtual-key[data-letter = '${keyboard_key}']`);
    if(virtual_key){
        virtual_key.classList.add("active");

        const removeActiveClass = ()=>virtual_key.classList.remove("active");
        virtual_key.addEventListener("transitionend",removeActiveClass, { once: true });
        // fallback in case the event listener was triggered multiple times
        setTimeout(removeActiveClass, 500);
    }

}