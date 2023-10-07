const questions = [
    {
        question: "A shopkeeper bought a toy for Rs.20 and sold it for Rs.25. What was his profit percentage?",
        answers: [
            {text: "20%", correct: false},
            {text: "25%", correct: true},
            {text: "30%", correct: false},
            {text: "15%", correct: false},

        ]
    },
    {
        question: "A bicycle is bought for Rs.120 and sold at a loss of 10%. What is the selling price?",
        answers: [
            {text: "Rs.108", correct: true},
            {text: "Rs.110", correct: false},
            {text: "Rs.130", correct: false},
            {text: "Rs.132", correct: false},

        ]
    },
    {
        question: "A student bought a textbook for Rs.40 and sold it to a friend for Rs.30. What was the loss percentage?",
        answers: [
            {text: "10%", correct: false},
            {text: "20%", correct: true},
            {text: "25%", correct: false},
            {text: "30%", correct: false},

        ]
    },
    {
        question: "If a jacket is sold for Rs.60 with a profit of 20%, what is its cost price?",
        answers: [
            {text: "Rs.50", correct: false},
            {text: "Rs.48", correct: false},
            {text: "Rs.55", correct: false},
            {text: "Rs.58", correct: true},

        ]
    },
    {
        question: "A car is sold at a profit of 12.5%, and the selling price is Rs.22,500. What was the cost price of the car?",
        answers: [
            {text: "Rs.18,000", correct: false},
            {text: "Rs.20,000", correct: true},
            {text: "Rs.21,250", correct: false},
            {text: "Rs.25,000", correct: false},

        ]
    }

];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
      handleNextButton();  
    }
    else{
        startQuiz();
    }
});

startQuiz();


