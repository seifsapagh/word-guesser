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
            let key_div = document.createElement("div");
            key_div.classList.add("key",key);
            key_div.textContent = key;

            if(!["enter","del"].includes(key)){
                let position = document.createElement("div");
                position.classList.add("position-feedback");
                key_div.appendChild(position);
            }

            row_div.appendChild(key_div);

            
        });

        keyboard_box.appendChild(row_div);
    });

    addKeyboardFunctionality();
}

export function addKeyboardFunctionality(){
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
