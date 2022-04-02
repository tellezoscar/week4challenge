const startButton = document.getElementById('start-btn')
const timerElement = document.getElementById("timer")
const questionContainerElement = document.getElementById ('question-container')
const questionElement = document.getElementById('question')
const answersButtonElement = document.getElementById('answer-buttons')
const nextQuestion = document.getElementById('answer-buttons')
let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startQuiz)
nextQuestion.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

var highscore = {
    initials: "",
    score: 0,
};

var highscores= [];
var secondsLeft;
var timerInterval;

init();

function init() {
    score = 0;
    secondsLeft = 60;
}

function startQuiz() {
timerInterval = setInterval(function() {
    secondsLeft--;
    timerElement.textContent = secondsLeft;
    
    if (secondsLeft <= 0) {
        clearInterval(timerInterval);
    }
}, 1000);

startButton.classList.add('hide')
shuffledQuestions = questions.sort(() =>Math.random() - .5)
currentQuestionIndex = 0
questionContainerElement.classList.remove('hide')
setNextQuestion()
}

function setNextQuestion() {
    resetState()
showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
      const button = document.createElement('button')
      button.innerText = answer.text
      button.classList.add('btn')
    //   if (answer.correct) {
    //     button.dataset.correct = answer.correct
    //   }
      button.addEventListener('click', selectAnswer)
      answersButtonElement.appendChild(button)
    })
  }

  function resetState() {
    clearStatusClass(document.body)
    while (answersButtonElement.firstChild) {
        answersButtonElement.removeChild(answersButtonElement.firstChild)
    }
  }

function selectAnswer(e) {
    const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answersButtonElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
  } else {
    startButton.innerText = 'View Highscores'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
      element.classList.add('correct')
    } else {
      element.classList.add('wrong')
    }
  }
  
  function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
  }

const questions = [
    {
        question: 'What is 2 + 2?',
        answers: [
          { text: '4', correct: true },
          { text: '22', correct: false }
        ]
      },
      {
        question: 'What is 1 + 1?',
        answers: [
          { text: '1', correct: true },
          { text: '11', correct: false }
        ]
      },
      {
        question: 'What is 3 + 2?',
        answers: [
          { text: '5', correct: true },
          { text: '24', correct: false }
        ]
      },
]