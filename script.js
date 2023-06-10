//Variable Array Questions and Multiple Choice.
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
    },
  ];
  
  // Get references to HTML elements
  var quizScreen = document.getElementById("quiz-screen");
  var startButton = document.getElementById("start-btn");
  var questionText = document.getElementById("question-text");
  var choicesList = document.getElementById("choices-list");
  var feedback = document.getElementById("feedback");
  var nextButton = document.getElementById("next-btn");
  var gameOverScreen = document.getElementById("game-over-screen");
  var finalScore = document.getElementById("final-score");
  var initialsForm = document.getElementById("initials-form");
  var initialsInput = document.getElementById("initials");
  
  var currentQuestionIndex = 0;
  var score = 0;
  var timeLeft = 60;
  var timerId;
  
  // Function to start the quiz
  function startQuiz() {
    document.getElementById("start-screen").classList.add("hide");
    quizScreen.classList.remove("hide");
    timerId = setInterval(updateTime, 1000);
    showQuestion();
  }
  
  // ShowQuestionFunction to display a question and its choices
function showQuestion() {
    var question = questions[currentQuestionIndex];
    questionText.textContent = question.question; // Display the question text
  
    // Clear the choices list
    choicesList.innerHTML = '';
  
    // For loop for creating and appending choice buttons
    for (var i = 0; i < question.choices.length; i++) {
      var choice = question.choices[i];
      var choiceButton = document.createElement('button');
      choiceButton.textContent = choice;
      choiceButton.addEventListener('click', handleChoiceClick);
      choicesList.appendChild(choiceButton);
    }
  }
  
  
  // Event handler function for choice button click
  function handleChoiceClick(event) {
    var selectedChoice = event.target.textContent;
    var question = questions[currentQuestionIndex];
  
    if (selectedChoice === question.answer) {
      feedback.textContent = "Correct!";
      score += 10; // Increase the score by 10 for a correct answer
    } else {
      feedback.textContent = "Wrong!";
      timeLeft -= 10; // Penalty of 10 seconds for a wrong answer
    }
  
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }
  
  // Function to end the quiz
  function endQuiz() {
    clearInterval(timerId);
    quizScreen.classList.add("hide");
    gameOverScreen.classList.remove("hide");
    finalScore.textContent = score;
  }
  
  // Add event listener to the start button
  startButton.addEventListener("click", startQuiz);
  