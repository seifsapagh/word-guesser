
export function triggerShakeAnimation(row){
    row.classList.add("shake");
    setTimeout(()=>{
        row.classList.remove("shake");
    }, 500);
}

let message_overlay = document.querySelector(".msg-overlay");
let message_content = document.querySelector(".msg-overlay .message");
let msg_timoutID;
export function showMessage(msg, duration = 1.2, overlay = false){
    message_overlay.classList.remove("hidden");
    message_content.textContent = msg;

    if(overlay){
        message_overlay.classList.add("background-dim")
    }
    
    if( duration > 0){
        clearTimeout(msg_timoutID); // prevent overlapping timeouts
        msg_timoutID= setTimeout(hideMessage, duration*1000);
    }
}

export function hideMessage(){
    message_overlay.classList.add("hidden");
    message_overlay.classList.remove("background-dim")
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
let overlay = document.querySelector("section.overlay");

export function showOverlay(){
    overlay.classList.remove("hidden");
    setTimeout(flipCards, 300);
}
export function hideOverlay(){
    overlay.classList.add("hidden");
    unflipCards();
}

export function celebrate(){
    confetti({
        particleCount: 500,
        spread: 80,
        origin: { y: 0.7 },
        colors : ["#00a63e", "#df9e00", "#d00002", "#002ca6","#009ea6", "#7c00a6","#fff", "#df00" ],
        startVelocity : 50,
        spread: 180,
        gravity: 1.1,
        ticks : 500
    });
}

export const failSound = new Audio("/assets/mission_failed.mp3");
export function playAudio(sound){
    sound.currentTime = 0;
    sound.volume = 0.2;
    sound.play().catch(err => {
        console.warn("Couldn't Play Audio: ", err)
    });
}

//  since we only have the fail audio for now,
//  if more sounds are added, i'll be keeping them in an object and loop over em
export function stopAudio(sound = failSound){
    sound.pause();
    sound.currentTime = 0;
}