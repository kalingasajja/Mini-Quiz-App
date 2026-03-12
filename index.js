const quizData = [
{
    question : "What does DOM stands for?",
    options: [
        "Document Object Model",
        "Data Object Model",
        "Document Oriented Model",
        "Data Oriented Model"
    ],
    correct : 0
},
{
    question : "What does CSS stands for?",
    options: [
        "Creative Style Sheets",
        "Computer Style Sheets",
        "Colorful Style Sheets",
        "Cascading Style Sheets"
    ],
    correct : 3
},
{
    question: "Which HTML tag is used to include JavaScript?",
    options: [
        "<javascript>",
        "<script>",
        "<js>",
        "<code>"
    ],
    correct: 1
},
{
    question: "Which CSS property is used to change text color?",
    options: [
        "font-color",
        "text-color",
        "color",
        "background-color"
    ],
    correct: 2
},
{
    question: "Which HTML tag is used to create a hyperlink?",
    options: [
        "<link>",
        "<a>",
        "<href>",
        "<hyperlink>"
    ],
    correct: 1
},
{
    question: "Which JavaScript keyword is used to declare a variable?",
    options: [
        "var",
        "int",
        "string",
        "variable"
    ],
    correct: 0
},
{
    question: "Which CSS property controls the text size?",
    options: [
        "text-style",
        "font-size",
        "text-size",
        "font-style"
    ],
    correct: 1
},
{
    question: "Which HTML tag is used to insert an image?",
    options: [
        "<img>",
        "<image>",
        "<picture>",
        "<src>"
    ],
    correct: 0
},
{
    question: "Which method is used to select an element by id in JavaScript?",
    options: [
        "querySelectorAll()",
        "getElementById()",
        "getElementsByClassName()",
        "selectElement()"
    ],
    correct: 1
},
{
    question: "Which CSS property is used to change the background color?",
    options: [
        "color",
        "bgcolor",
        "background-color",
        "background-style"
    ],
    correct: 2
}
];

let questions = [...quizData].sort(() => Math.random() - 0.5);

const questionElem = document.getElementById("question");
const optionsElem = document.getElementById("options")
const nextBtn = document.getElementById("next-btn");
const resultElem = document.getElementById("result");
const timerElem = document.getElementById("timer");
let currentQuestion = 0;
let score = 0;
let timer ;

let timeLeft ;



function loadQuestion() {
     clearInterval(timer);
     timeLeft = 15;
     updateTimer();

     timer = setInterval(countdown,1000);

    const q = questions[currentQuestion];
    questionElem.textContent = `${ currentQuestion +1 }. ${q.question}`;
    optionsElem.innerHTML = "";

    q.options.forEach((option,index)=> {
        const btn = document.createElement("button");
        btn.classList.add("option-btn");
        btn.textContent = option;

        btn.addEventListener("click",() => selectAnswer(index,true));


        optionsElem.appendChild(btn);

    })

    nextBtn.style.display = "none";





}


function countdown(){
    timeLeft--;
    updateTimer();
    if(timeLeft === 0){
        clearInterval(timer);
        selectAnswer(questions[currentQuestion]?.correct,false);

    }
}

function updateTimer() {
    timerElem.textContent = `🕘 ${timeLeft}`;

}
function selectAnswer(index,shouldScore){

    const  btns = document.querySelectorAll(".option-btn");
    const q = questions[currentQuestion];
    btns.forEach(btn => btn.disabled = true);

    if(index === q.correct) {
        btns[index].classList.add("correct");
        shouldScore && score++;
    }

    else {
        btns[index].classList.add("wrong");
        btns[q.correct].classList.add("correct");

    }

    nextBtn.style.display = "inline-block";



}

nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if(currentQuestion < questions.length) {

        loadQuestion();

    }
    else {
        // show the result
        showResult();


    }
})

function showResult() {
    nextBtn.style.display = "none";
    questionElem.style.display = "none";
    optionsElem.style.display = "none";

    const highScore = localStorage.getItem("highscore") || 0;

    const isNew = score > highScore;

    if(isNew){
        localStorage.setItem("highscore",score);

    }

    resultElem.innerHTML = `
    <h2> Wow!! Quiz Completed <h2> 
    <p> You scored ${score} out of ${questions.length} questions </h2>
    <p> High Score : ${Math.max(score,highScore)} </p>
    ${isNew ? "<p> Hey , New High Score!</p>":""}
    <button onclick="location.reload()">Restart Quiz</button>

    `

}

loadQuestion();


