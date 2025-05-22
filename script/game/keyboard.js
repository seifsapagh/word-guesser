export function addVirtualKeyboard(){
    let keyboard_box = document.querySelector(".keyboard");
    let keyboard_layout = 
    [
        [..."qwertyuiop"] ,
        [..."asdfghjkl"] ,
        ["del",..."zxcvbnm","enter"]
    ];
    
    keyboard_layout.forEach(row=>{

        let row_div = document.createElement("div");
        row_div.classList.add("keyboard-row");

        row.forEach(key=>{


            let virtual_key = document.createElement("div");
            virtual_key.classList.add("virtual-key");
            virtual_key.dataset.letter = key
            virtual_key.textContent = key;
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
            let char = key.dataset.letter.toUpperCase();
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
