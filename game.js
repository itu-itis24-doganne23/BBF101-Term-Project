const letter1 = document.getElementById("letter1");
const letter2 = document.getElementById("letter2");
const letter3 = document.getElementById("letter3");
const letter4 = document.getElementById("letter4");
const letter5 = document.getElementById("letter5");
const letters = [letter1,letter2,letter3,letter4,letter5];
const pred_input = document.getElementById("prediction_input");
const submit_button = document.getElementById("submit_button");
const reset_button = document.getElementById("reset_button");
const score_p = document.getElementById("score");
const heart1 = document.getElementById("heart1");
const heart2 = document.getElementById("heart2");
const heart3 = document.getElementById("heart3");
const hearts = [heart1,heart2,heart3];
const prediction_word = "synth";
let lives = 3;
let open_letter_list = [0,0,0,0,0];
let move = 0;

function prediction(text){
    if (text.length === 1){
        if (prediction_word.includes(text)) {
            open_letter(text);
        }else {
            lives--;
            update_lives();
        }
    }else{
        text = text.toLowerCase();
        if (text === prediction_word){
            open_letter(text);
            score_p.textContent = "Score: 100";
        }else{
            lives = 0;
        }
    }
}
function open_letter(text) {
    for (let i=0;i<text.length;i++){
        let index = prediction_word.indexOf(text[i]);
        if (open_letter_list[index] != 1){
            open_letter_list[index] = 1;
            letters[index].src = "letters/" + text[i] + ".svg";
            score_p.textContent = "Score: " + String(parseInt(score_p.textContent.slice(-2)) + 20);
        }
    }
}
function update_lives(){
    for (let i = 0; i < lives; i++) {
        hearts[i].src = "heart.svg";
    }
    if (lives != 3){
        hearts[lives].src = "broken_heart.svg";
    }
    for (let j = 0; j < 3-lives; j++) {   
        setTimeout(function(){
            hearts[2-j].src = "blank.svg";
        }, 200);
    }
}
function won_game(){
    window.alert("Congratulation!\nYou Win");
    submit_button.disabled = true;
}
function lost_game(){
    update_lives();
    window.alert("Game Over!\nTry Again");
    submit_button.disabled = true;
}

function reset(){
    score_p.textContent = "Score: 0";
    lives = 3;
    update_lives();
    for (let i=0;i<5;i++) {
        letters[i].src = "card.svg";
    }
    pred_input.value = "";
    open_letter_list = [0,0,0,0,0];
    reset_button.style.display = "none";
    move = 0;
    submit_button.disabled = false;
}
function is_won() {
    if (lives === 0) {
        lost_game();
    }
    else if (list_sum(open_letter_list) === 5) {
        won_game()
    }
}

function list_sum(arr) {
    let tot = 0;
    for (let i = 0; i < arr.length; i++) {
        tot += arr[i];
    }
    return tot;
}

submit_button.addEventListener("click", ()=>{
    let word = pred_input.value.toLowerCase();
    if (word.length != 0) {
        if (move == 0 ) {
            reset_button.style.display = "inline";
        }
        prediction(word);
        setTimeout(is_won, 300);
        move++;
        pred_input.value = "";
    }
});
reset_button.addEventListener("click",reset);

pred_input.addEventListener("keypress",function (e){
    if (e.key == "Enter") {
        submit_button.click();
    }
});