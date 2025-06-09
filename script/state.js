export let state =
{
    game_on : false,
    word : "",
    current_row: 0,
    current_letter: 0,
    word_list: {},
    dict : {},
}

export let settings = {
    word_length : 5,
    max_guesses : 5
}

export function updateSettings(maxGuesses, maxLetters){
    settings.max_guesses = maxGuesses;
    settings.word_length = maxLetters;
}
