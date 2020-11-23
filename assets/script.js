var questions = [
  {
    title: "How do you create a function in JavaScript?",
    choices: ["var function = myFunction()", "var myFunction = function ()", "function:myFunction", "var function = myFunction"],
    answer: "var myFunction = function ()",
  },
  {
    title: "How does a FOR loop start?",
    choices: ["for (i = 0; i <= 5; i++)", "for(i <= 5; i++", "for i = 1-5", "for (i = 0; i <= 5)"],
    answer: "for (i = 0; i <= 5; i++)",
  },
  {
    title: "How can you add a comment or pseudocode in JavaScript?",
    choices: [
      "<!--comment-->",
      "//comment",
      "'comment'",
      "all of the above",
    ],
    answer: "//comment",
  },
  {
    title:
      "How do you declare a JavaScript variable?",
    choices: ["v varName;", "variable varName;", "variable = varName;", "var varName;"],
    answer: "var varName;",
  },
  {
    title:
      "Which operator is used to assign a value to a variable?",
    choices: ["-", "+", "()", "="],
    answer: "=",
  },
];
//declared variables
var score = 0;
var questionIndex = 0;

//declared variables
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

//seconds left is 15 seconds per question:
var timeLeft = 76;
//holds interval time
var holdInterval = 0;
//holds penalty time
var penalty = 10;
//creates new element
var ulCreate = document.createElement("ul");

//triggers timer on button, shows user a display on the screen
timer.addEventListener("click", function () {
  //we are checking zero because its originally set to zero
  if (holdInterval === 0) {
    holdInterval = setInterval(function () {
      timeLeft--;
      currentTime.textContent = "Time: " + timeLeft;

      if (timeLeft <= 0) {
        clearInterval(holdInterval);
        quizDone();
        currentTime.textContent = "Time's up!";
      }
    }, 1000);
  }
  loadQuestions(questionIndex);
});

//renders questions and choices to page:
var loadQuestions = function (questionIndex) {
  //clears existing data
  questionsDiv.innerHTML = "";
  ulCreate.innerHTML = "";
  //for loops to loop through the array
  for (var i = 0; i < questions.length; i++) {
    // Appends question title only
    var userQuestion = questions[questionIndex].title;
    var userChoice = questions[questionIndex].choices;
    questionsDiv.textContent = userQuestion;
  }
  //new for each for question choices
  userChoice.forEach(function (newItem) {
    var listItem = document.createElement("li");
    listItem.textContent = newItem;
    questionsDiv.appendChild(ulCreate);
    ulCreate.appendChild(listItem);
    listItem.addEventListener("click", compare);
  });
}
//function to compare choices with answer
var compare = function (event) {
  var element = event.target;

  if (element.matches("li")) {
    var createDiv = document.createElement("div");
    createDiv.setAttribute("id", "createDiv");
    //correct condition
    if (element.textContent == questions[questionIndex].answer) {
      score++;
      createDiv.textContent =
        "Correct! The answer is:  " + questions[questionIndex].answer;
      //correct condition
    } else {
      //will subtract -5 seconds off timeLeft for wrong answer
      timeLeft = timeLeft - penalty;
      createDiv.textContent =
        "Wrong! The correct answer is:  " + questions[questionIndex].answer;
    }
  }
  //question Index determines the question user is on
  questionIndex++;

  if (questionIndex >= questions.length) {
    //will append last page with user stats
    quizDone();
    createDiv.textContent =
      "End of quiz!" +
      " " +
      "You got  " +
      score +
      "/" +
      questions.length +
      " Correct!";
  } else {
    loadQuestions(questionIndex);
  }
  questionsDiv.appendChild(createDiv);
}
//append last page
var quizDone = function () {
  questionsDiv.innerHTML = "";
  currentTime.innerHTML = "";

  //heading
  var createH1 = document.createElement("h1");
  createH1.setAttribute("id", "createH1");
  createH1.textContent = "All Done!";

  questionsDiv.appendChild(createH1);

  //paragraph
  var createP = document.createElement("p");
  createP.setAttribute("id", "createP");

  questionsDiv.appendChild(createP);

  //calculates time remaining and replaces it with score
  if (timeLeft >= 0) {
    var timeRemaining = timeLeft;
    var createP2 = document.createElement("p");
    clearInterval(holdInterval);
    createP.textContent = "Your final score is: " + timeRemaining;

    questionsDiv.appendChild(createP2);
  }

  //create a label
  var createLabel = document.createElement("label");
  createLabel.setAttribute("id", "createLabel");
  createLabel.textContent = "Enter your initials: ";

  questionsDiv.appendChild(createLabel);

  //create input
  var createInput = document.createElement("input");
  createInput.setAttribute("type", "text");
  createInput.setAttribute("id", "initials");
  createInput.textContent = "";

  questionsDiv.appendChild(createInput);

  //submit
  var createSubmit = document.createElement("button");
  createSubmit.setAttribute("type", "submit");
  createSubmit.setAttribute("id", "Submit");
  createSubmit.textContent = "Submit";

  questionsDiv.appendChild(createSubmit);

  //event listener captures initials and local storage for initials and scores
  createSubmit.addEventListener("click", function () {
    var initials = createInput.value;

    if (initials === null) {
      console.log("No value entered!");
    } else {
      var finalScore = {
        initials: initials,
        score: timeRemaining,
      };
      console.log(finalScore);
      var allScores = localStorage.getItem("allScores");
      if (allScores === null) {
        allScores = [];
      } else {
        allScores = JSON.parse(allScores);
      }
      allScores.push(finalScore);
      var newScore = JSON.stringify(allScores);
      localStorage.setItem("allScores", newScore);
      //takes you to final page
      window.location.replace("./HighScores.html");
    }
  });
}
