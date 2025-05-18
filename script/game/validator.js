import { state } from "../state.js";
// check if word exists in word list
export function checkExistance(letters){
    let user_input = ""
    letters.forEach(letter=>{
        user_input += letter.textContent;
    });

    if(!state.word_list[user_input]){
        return false;
    }

    return true;
}


function evaluateResult(){
    letters.forEach(letter=>{
        if(letter.textContent != state.word[i])
        {
            return false
        }
    });
    return true;
}

// Test User input against our chosen word and highlight each letter accordingly.
export function checkResults(letters){
    let i= 0;
    let result = true;
    
    letters.forEach(letter=>{
        
        let virtual_key = document.querySelector(`.key.${letter.textContent}`);

        // virtual_key.classList.remove("wrong", "right", "misplaced"); // remove redundant classes

        virtual_key.classList.add("animate");
        letter.classList.add("finished");

        if(letter.textContent == state.word[i])
        {
            letter.classList.add("right");
            if(! virtual_key.classList.contains("right")){ 

                virtual_key.classList.remove("misplaced");
                virtual_key.classList.add("right");
            }
        }
        else if (letter.textContent != state.word[i] &&  state.word.includes( letter.textContent)  )
        {
            letter.classList.add("misplaced");
            if(! virtual_key.classList.contains("right")){ 
                virtual_key.classList.add("misplaced");
            }
            result = false;
        }
        else
        {
            letter.classList.add("wrong");
            if(!virtual_key.classList.contains("wrong")){
                virtual_key.classList.add("wrong");
            }
            result= false;
        }

        i++;
        setTimeout(e=>{virtual_key.classList.remove("animate")},500);
    });
    return result;
}
