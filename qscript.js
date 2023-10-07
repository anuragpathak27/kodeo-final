const questions = [
    {
        question: "What is agriculture ?",
        answers: [
            {text: "Farming of animals", correct: false},
            {text: "Growing of crops and plants", correct: true},
            {text: "Building houses", correct: false},
            {text: "Mining minerals", correct: false},

        ]
    },
    {
        question: "Which of the following is not a Rabi crop ?",
        answers: [
            {text: "Wheat", correct: true},
            {text: "Rice", correct: false},
            {text: "Barley", correct: false},
            {text: "Mustard", correct: false},

        ]
    },
    {
        question: "What is the process of separating the unwanted grains from the harvested crop called ?",
        answers: [
            {text: "Threshing", correct: false},
            {text: "Sowing", correct: false},
            {text: "Irrigation", correct: false},
            {text: "Weeding", correct: true},

        ]
    },
    {
        question: "Which of the following is not a method of irrigation ?",
        answers: [
            {text: "Drip irrigation", correct: false},
            {text: "Rainfed cultivation", correct: true},
            {text: "Rahat", correct: false},
            {text: "Sprinkler irrgation", correct: false},

        ]
    },
    {
        question: "What is the process of separating chaff from the grain by tossing it in the air called ?",
        answers: [
            {text: "Winnowing", correct: true},
            {text: "Threshing", correct: false},
            {text: "Weeding", correct: false},
            {text: "Ploughing", correct: false},

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


