
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



let cards = document.querySelectorAll(".flip-inner")
function flipCards(){
    cards.forEach((card, index) => {
        setTimeout(
            () => { card.classList.add("flipped"); },
            index * 100
        );
    });
}

function unflipCards(){
    cards.forEach(card => {
        card.classList.remove("flipped");
    })
    
}

export let overlay_content = document.querySelector(".overlay-content");
let overlay = document.querySelector(".overlay");

export function showOverlay(){
    overlay.classList.remove("hidden");
    setTimeout(flipCards, 300);
}
export function hideOverlay(){
    overlay.classList.add("hidden");
    unflipCards();
}
