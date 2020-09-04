const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const scoreText = document.getElementById( 'score');
const timer = document.getElementById('timer');
const home = document.getElementById('home');
const game = document.getElementById('game');
const play = document.getElementById('play');
const postGame = document.getElementById("postGame");
const highScoresId = document.getElementById("highScoresId");
const done = document.getElementById('done');
const username = document.getElementById("username");

const saveScorebtn = document.getElementById("saveScoreBtn")
const viewHighScores = document.getElementById("viewHighScores");
const finalScore = document.getElementById("finalScore");
const allHighScores = document.getElementById("allHighScores");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

let currentQuestion = {};
let acceptingAnswers = false;
let score = 340;
let questionCounter = 0;
var availableQuestions = [];
scoreText.innertext = score;

let questions = [
    {
        // another set of the above. and so forth. 
        question: "Who Wrote Robinson Crusoe:",
        choice1: "Mark Twain",
        choice2: "Rudyard Kipling",
        choice3: "Daniel Defoe",
        choice4: "Lewis Carroll",
        answer: 3
    },
    {
        // another set of the above. and so forth. 
        question: "Who wrote 'Fahrenheit 451'? ",
        choice1: "Ray Bradbury",
        choice2: "Arthur C. Clarke",
        choice3: "Isaac Asimov",
        choice4: "Winsor McCay",
        answer: 1
    },
    {
        // another set of the above. and so forth. 
        question: "Who wrote 'Little Women'?",
        choice1: "Edith Wharton",
        choice2: "Emma Goldman",
        choice3: "Louisa May Alcott",
        choice4: "Upton Sinclair",
        answer: 3
    },
    {
        // another set of the above. and so forth. 
        question: "Who Wrote 'Cat's Cradle'? ",
        choice1: "Neil Gaiman",
        choice2: "Issac Asimov",
        choice3: "Harlan Ellison",
        choice4: "Kurt Vonnegut",
        answer: 4
    },
    {
        // another set of the above. and so forth. 
        question: "Who Wrote 'The Shining'?",
        choice1: "Stephen King",
        choice2: "Robert Bloch",
        choice3: "Stephen Foster",
        choice4: "Clive Barker",
        answer: 1
    },
]

// constants

const CORRECT_BONUS = -10;
const MAX_QUESTIONS = 5;

play.addEventListener("click", function() {
    startGame()
});

done.addEventListener("click", function(){
    resetGame();
});

username.addEventListener('keyup', () =>{
    saveScorebtn.disabled = !username.value;
});

viewHighScores.addEventListener("click", () =>{
    game.classList.add('hidden');
    postGame.classList.add('hidden');

    highScoresId.classList.remove('hidden');
    allHighScores.innerHTML = highScores;

});

startGame = () => {
    questionCounter = 0;
    score = 30;
    availableQuestions = [ ...questions];
    console.log(availableQuestions);
    getNewQuestion();
    startTimer();
};

function startTimer(){
    home.classList.add('hidden');
    game.classList.remove('hidden');

    interval = setInterval(function(){
        scoreText.innerHTML = score;
        score--;
        if(score <= 0){
            stopInterval();
            postGame.classList.remove('hidden');
            game.classList.add('hidden');
            finalScore.innerText = score;
        }
    }, 1000);

}

var stopInterval = function() {
    clearInterval(interval);
    scoreText.innerHTML="Time's Up";
}

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){

        // Show the end page, and hide the game page. 
        stopInterval();
            postGame.classList.remove('hidden');
            game.classList.add('hidden');
            finalScore.innerText = score;

    }

    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;

};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;


        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if(classToApply === 'incorrect'){
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score +=num;
    scoreText.innertext = score;
}


function resetGame(){
    home.classList.remove('hidden');
    game.classList.add('hidden');
    postGame.classList.add('hidden');
}

saveHighScore = (e) => {
    e.preventDefault();

    const score ={
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a,b) => b.score - a.score);
    highScores.splice(5);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    
    
}