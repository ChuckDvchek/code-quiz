//Defining variables that grab parts of the page
var header = document.querySelector(".header");
var start = document.querySelector("#start");
var addingScore = document.querySelector("#adding-score");
var scoreEl = document.querySelector("#score");
var main = document.querySelector(".main");
var startBtn = document.querySelector("#start-btn");
var options = document.querySelector("#options");
var option1 = document.querySelector("#option1");
var option2 = document.querySelector("#option2");
var option3 = document.querySelector("#option3");
var option4 = document.querySelector("#option4");
var addingScoreYes = document.querySelector("#adding-score-yes");
var addingScoreNo = document.querySelector("#adding-score-no");
var addingScoreScore = document.querySelector("#adding-score-score");
var scoreName = document.querySelector("#score-name");
var timerEl = document.querySelector("#timer");
var playAgain = document.querySelector("#play-again");
var scoreboard = document.querySelector("#scoreboard");
var clearScore = document.querySelector("#clear-score");
var clearScoreboard = document.querySelector("#clear-scoreboard");

//Turns off everything except the start page
options.setAttribute("style","display:none;");
addingScore.setAttribute("style","display:none;");
scoreEl.setAttribute("style","display:none;");

//Defines variables used for scoping reasons
var selQuest = -1;
var timeNotRunning = true;
var secondsLeft;
var score;
var timer;
var scoreArr;

//Storing the questions
var question = [
{
    title: "What is a word that starts with 'B'?",
    answerOne: "Banana",
    answerTwo: "Cat",
    answerThree: "Potato",
    answerFour: "Hamster",
    correct: 1
},
{
    title: "What letter does Banana start with?",
    answerOne: "A",
    answerTwo: "B",
    answerThree: "C",
    answerFour: "D",
    correct: 2
},
{
    title: "the correct answer is three",
    answerOne: "one",
    answerTwo: "two",
    answerThree: "three",
    answerFour: "four",
    correct: 3
},
{
    title: "the correct answer is one",
    answerOne: "one",
    answerTwo: "two",
    answerThree: "three",
    answerFour: "four",
    correct: 1
},
{
    title: "red pandas are the cutest",
    answerOne: "true",
    answerTwo: "false",
    answerThree: "false",
    answerFour: "flase",
    correct: 1
}
];

//Starting the quiz
startBtn.addEventListener("click",function(){

    selQuest = -1;
    let quizLength = 45;
    startTimer(quizLength);

    start.setAttribute("style","display:none;");
    options.setAttribute("style","display:inline;");

    nextQuestion();

    addButton(option1,1);
    addButton(option2,2);
    addButton(option3,3);
    addButton(option4,4);
});

addingScoreYes.addEventListener("click",function(){

    if(scoreName.value != ""){
        header.textContent = "Scores:";
        addingScore.setAttribute("style","display:none;");
        scoreEl.setAttribute("style","display:inline;");

        if(localStorage.getItem("scoreArr")!==null){
            scoreArr = JSON.parse(localStorage.getItem("scoreArr"));
            scoreArr.push(scoreName.value,score);
            localStorage.setItem("scoreArr",JSON.stringify(scoreArr));
        } else {
            scoreArr = [scoreName.value,score];
            localStorage.setItem("scoreArr",JSON.stringify(scoreArr));
        }

        loadScore();
    }
});

addingScoreNo.addEventListener("click",goToPageStart);

playAgain.addEventListener("click",goToPageStart);

clearScore.addEventListener("click",function(){
    scoreArr = [];
    localStorage.setItem("scoreArr",JSON.stringify(scoreArr));
    scoreboard.setAttribute("style","display:none;")
    clearScoreboard.setAttribute("style","display:inline;")
});

function startTimer(quizTime) {
    timeNotRunning = false;
    secondsLeft = quizTime;
    timer = setInterval(function(){
        secondsLeft--;
        console.log(secondsLeft);
        timerEl.textContent = secondsLeft + " seconds left in the quiz";

        if(secondsLeft <= 0){
            clearInterval(timer);
            timeNotRunning = true;
            endQuiz();
            //update page to say you lost
            //store the score
        }
    },1000);
}

function addButton(option,yes){
    option.addEventListener("click",function(){
        if(question[selQuest].correct==yes){
            console.log("That was correct!");
        } else {
            console.log("That was wrong");
            secondsLeft = secondsLeft - 5;
        }
        if(selQuest < question.length-1){
            nextQuestion();
        } else {
            //go to the adding highscore page
            endQuiz();
        }
    });
}

function nextQuestion(){
    selQuest++;
    header.textContent = question[selQuest].title;
    option1.textContent = question[selQuest].answerOne;
    option2.textContent = question[selQuest].answerTwo;
    option3.textContent = question[selQuest].answerThree;
    option4.textContent = question[selQuest].answerFour;
}

function goToPageStart(){
    location.reload();
}

function loadScore(){
    for (let i = 0; i < scoreArr.length; i=i+2) {
        let li = document.createElement("li");
        li.textContent = "Name: " + scoreArr[i] + ", Score: " + scoreArr[i+1];
        scoreboard.appendChild(li);
    }
}

function endQuiz(){
    header.textContent = "Would you like to add your score? If yes, type your name and press yes.";
    options.setAttribute("style","display:none;");
    addingScore.setAttribute("style","display:inline;");
    score = secondsLeft;
    addingScoreScore.textContent = "Your score: " + score;
    console.log("your score is: " + score);
    clearInterval(timer);
}