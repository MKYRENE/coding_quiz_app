// VARIABLE ARRAY OF QUESTIONS AND MULTIPLE CHOICE
var questions = [
  {
    question:
      "What is the output of the following JavaScript code?\n\nconsole.log(typeof null);",
    choices: ["null", "undefined", "object", "boolean"],
    answer: "object",
  },
  {
    question:
      'What is the purpose of the "querySelector" method in JavaScript?',
    choices: [
      "To select multiple elements from the DOM",
      "To select the first element that matches a CSS selector",
      "To modify the CSS of an element",
      "To create a new HTML element",
    ],
    answer: "To select the first element that matches a CSS selector",
  },
  {
    question: 'What is the result of the following expression?\n\n5 + "5"',
    choices: ["10", "55", '5 + "5"', '"55"'],
    answer: '"55"',
  },
  {
    question:
      'What is the purpose of the "addEventListener" method in JavaScript?',
    choices: [
      "To perform mathematical operations",
      "To change the styling of an element",
      "To add event handlers to DOM elements",
      "To create a new function",
    ],
    answer: "To add event handlers to DOM elements",
  },
  {
    question:
      'What is the difference between "let" and "var" when declaring variables in JavaScript?',
    choices: [
      '"let" is block-scoped, while "var" is function-scoped',
      '"let" is function-scoped, while "var" is block-scoped',
      "There is no difference",
    ],
    answer: '"let" is block-scoped, while "var" is function-scoped',
  },
];

//VARIABLE REFERENCE TO HTML ELEMENT USING QUERYSELECTOR
var startButton = document.querySelector(".start");
var title = document.querySelector(".title");
var questionText = document.querySelector("#question-text");
var choicesList = document.querySelector("#choices-list");
var feedback = document.querySelector("#feedback");
var nextButton = document.querySelector("#next-btn");
var quizScreen = document.querySelector("#quiz-screen");
var gameOverScreen = document.querySelector("#game-over-screen");
var finalScore = document.querySelector("#final-score");
var initialsForm = document.querySelector("#initials-form");
var initialsInput = document.querySelector("#initials");

var currentQuestionIndex = 0;
var score = 0;
var timeLeft = 60;
var timerId;

// FUNCTION TO START THE QUIZ 
function startQuiz() {
  document.querySelector("#start-screen").classList.add("hide");
  quizScreen.classList.remove("hide");
  timerId = setInterval(updateTime, 1000);
   // ADD EXPLOSION CLASS TO TRIGGER ANIMATION ON SITE 
   title.classList.add("explosion");
  showQuestion();
}

//SHOW QUESTIONS FUNCTION TO DISPLAY A QUESTION & CHOIRCES 
function showQuestion() {
  var question = questions[currentQuestionIndex];
  questionText.textContent = question.question; // DISPLAY QUESTION TEXT

  // CLEAR CHOICES LIST 
  choicesList.innerHTML = "";

  //FOR LOOP THROUGH CHOICES AND CREATE BUTTON 
  for (var i = 0; i < question.choices.length; i++) {
    var choice = question.choices[i];
    var choiceButton = document.createElement("button");
    choiceButton.textContent = choice;
    choiceButton.addEventListener("click", handleChoiceClick);
    choicesList.appendChild(choiceButton);
  }
}

// EVENT HANDLER FUNCTION FOR BUTTON CHOICE BUTTON CLICK
function handleChoiceClick(event) {
  var selectedChoice = event.target.textContent;
  var question = questions[currentQuestionIndex];

  if (selectedChoice === question.answer) {
    feedback.textContent = "Correct!";
    score += 10; // INCREASE SCORE BY +10
  } else {
    feedback.textContent = "Wrong!";
    timeLeft -= 10; // DECREASE SCORE BY -10
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

// END QUIZ FUNCTION
function endQuiz() {
  clearInterval(timerId);
  quizScreen.classList.add("hide");
  gameOverScreen.classList.remove("hide");
  finalScore.textContent = score;
}

// UPDATE TIME FUNCTION
function updateTime() {
  timeLeft--;
  if (timeLeft <= 0) {
    endQuiz();
  }
}

// ADDED EVENT LISTENER FOR CLICK & START THE QUIZ
startButton.addEventListener("click", startQuiz);
