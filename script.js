//DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const newQuizButton = document.getElementById("new-quiz-btn");
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
const formularioUpload = document.getElementById("formularioUpload");
const inputfile = document.getElementById("preguntasjson");

/*
const quizQuestion = [
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
];*/

let quizPreguntas = [];

//Variables de estado del quiz
let indicePreguntaActual = 0;
let puntaje = 0;


formularioUpload.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(inputfile.files.length ===0){
        alert('Selecciona un archivo JSON primero');
        return;
    }

    const file = inputfile.files[0];
    const reader = new FileReader();
    reader.onload = function(e){
        try {
            const contenido = e.target.result;
            quizPreguntas = JSON.parse(contenido);
            iniciarQuiz()
        } catch (error) {
            alert('Error al leer el archivo JSON. Asegúrate de que el formato sea correcto.');
        }
    }
    reader.readAsText(file);
})

answersContainer.addEventListener('click',(event)=>{
    if(event.target.classList.contains("answer-btn")){
        answersContainer.disabled = true;
        const selectedButton = event.target;
        const isCorrect = selectedButton.dataset.correct === "true";
        if(isCorrect){
            selectedButton.classList.add("correct");
            puntaje++;
        }else{
            selectedButton.classList.add("incorrect");
            const correctButton = answersContainer.querySelector('button[data-correct="true"]');
            if(correctButton){
                correctButton.classList.add("correct")
            }
        }
        setTimeout(()=>{
            indicePreguntaActual++;
            mostrarPregunta(quizPreguntas,indicePreguntaActual);
            answersContainer.disabled = false;
            mostrarPuntaje(puntaje);
            if(indicePreguntaActual >= quizPreguntas.length){
                mostrarResultados();
            }
        },1000)
    }
})


newQuizButton.addEventListener('click',()=>{
    quizPreguntas = [];
    indicePreguntaActual=0;
    puntaje=0;
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
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
    mostrarPregunta(quizPreguntas,indicePreguntaActual)
    totalQuestionsSpan.textContent = quizPreguntas.length;
}

function mostrarPregunta(quizPreguntas=[],indicePreguntaActual=0){
    if(indicePreguntaActual < quizPreguntas.length){
        const preguntaActual = quizPreguntas[indicePreguntaActual]
        questionText.textContent = preguntaActual.question;
        currentQuestionSpan.textContent = indicePreguntaActual +1;
        progressBar.style.width = `${((indicePreguntaActual+1)/quizPreguntas.length)*100}%`;

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

    if(puntaje===quizPreguntas.length){
        resultMessage.textContent = "¡Perfecto! ¡Excelente trabajo!";
    }else if(puntaje >= quizPreguntas.length*0.75){
        resultMessage.textContent = "¡Buen trabajo! ¡Sigue practicando!";
    }else if(puntaje >= quizPreguntas.length*0.5){
        resultMessage.textContent = "Sigue practicando, ¡puedes mejorar!";
    }else{
        resultMessage.textContent = "Aun no conoces el tema, ¡sigue estudiando!"
    }
}




