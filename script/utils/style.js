export function styleLetters(letters, curLetter,current_letter){
    letters.forEach(letter=>{
        if(letter !== curLetter){
            letter.classList.remove("curLetter");
        }
    });

    if(current_letter >= 0)
        curLetter.classList.add("curLetter");
}


export function triggerShakeAnimation(row){
    row.classList.add("shake");
    setTimeout(()=>{
        row.classList.remove("shake");
    }, 500);
}

export function showMessage(msg, duration=1.2){
    let message_box = document.querySelector(".game>.message");
    message_box.classList.remove("hidden");
    message_box.textContent = msg;
    setTimeout(()=>{
        message_box.classList.add("hidden");
    }, duration*1000);
}

