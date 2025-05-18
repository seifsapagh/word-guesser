import { initGame } from "./game/game.js";
import {handleKeyInput} from "./game/input.js";

document.addEventListener("DOMContentLoaded", e=>{
    initGame();
});


document.addEventListener("keyup", handleKeyInput);
