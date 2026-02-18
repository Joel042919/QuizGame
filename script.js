//DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");


const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

//Variables de estado del quiz
let indicePreguntaActual = 0;
let puntaje = 0;


startButton.addEventListener('click',iniciarQuiz);
answersContainer.addEventListener('click',(event)=>{
    if(event.target.classList.contains("answer-btn")){
        answersContainer.querySelectorAll(".answer-btn").forEach((btn)=>{
            btn.disabled = true;
        })
        const selectedButton = event.target;
        const isCorrect = selectedButton.dataset.correct === "true";
        if(isCorrect){
            selectedButton.classList.add("correct");
            puntaje++;
        }else{
            selectedButton.classList.add("incorrect");
        }
        setTimeout(()=>{
            indicePreguntaActual++;
            mostrarPregunta(quizQuestions,indicePreguntaActual);
            mostrarPuntaje(puntaje);
            if(indicePreguntaActual >= quizQuestions.length){
                mostrarResultados();
            }
        },1000)
    }
})

restartButton.addEventListener('click',()=>{
    indicePreguntaActual=0;
    puntaje=0;
    resultScreen.classList.remove('active');
    iniciarQuiz();
})

function mostrarPuntaje(puntaje){
    scoreSpan.textContent = puntaje;
}

function iniciarQuiz(){
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    mostrarPregunta(quizQuestions,indicePreguntaActual)
    totalQuestionsSpan.textContent = quizQuestions.length;
}

function mostrarPregunta(quizQuestions=[],indicePreguntaActual=0){
    if(indicePreguntaActual < quizQuestions.length){
        const preguntaActual = quizQuestions[indicePreguntaActual]
        questionText.textContent = preguntaActual.question;
        currentQuestionSpan.textContent = indicePreguntaActual +1;
        progressBar.style.width = `${((indicePreguntaActual+1)/quizQuestions.length)*100}%`;

        answersContainer.innerHTML = "";
        let fragment = document.createDocumentFragment()
        preguntaActual.answers.forEach((rpta)=>{
            const button = document.createElement("button");
            button.textContent = rpta.text;
            button.classList.add("answer-btn");
            button.dataset.correct = rpta.correct;
            fragment.appendChild(button)
        })
        answersContainer.appendChild(fragment);
    }
}

function mostrarResultados(){
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    finalScoreSpan.textContent = puntaje;

    if(puntaje===quizQuestions.length){
        resultMessage.textContent = "¡Perfecto! ¡Excelente trabajo!";
    }else if(puntaje >= quizQuestions.length*0.75){
        resultMessage.textContent = "¡Buen trabajo! ¡Sigue practicando!";
    }else if(puntaje >= quizQuestions.length*0.5){
        resultMessage.textContent = "Sigue practicando, ¡puedes mejorar!";
    }else{
        resultMessage.textContent = "Aun no conoces el tema, ¡sigue estudiando!"
    }
}




