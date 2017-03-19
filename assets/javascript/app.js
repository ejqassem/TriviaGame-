var triviaQuestions = {
  allQuestions: [{
    question : "Who said \"Nine Companions. So be it. You shall be the fellowship of the ring.\"",
    answerChoices: ["Elrond", "Gandalf", "Aargorn", "Celeborn"],
    answer: "Elrond"
  }, {
    question: "How many rings of power were forged in the second age?",
    answerChoices: ["1", "19", "20", "13"],
    answer: "20"
  }, {
    question: "\"In Fellowship of the Ring\", what gift does Lady Galadriel give Gimli before the fellowship leaves Lothlorien?",
    answerChoices: ["Elvish Rope", "Three strands of her hair", "A pint crafted rom wood", "a dagger"],
    answer: "Three strands of her hair"
  }, {
    question: "Who said the following quote: \"What about Elevenses? Luncheon? Afternoon Tea? Dinner? Supper He knows about them, doesn't he'?\"",
    answerChoices: ["Merry", "Elrond", "Pippin", "Bombur"],
    answer: "Pippin"
  }]
};

var randomQuestion;
var questionAsked;
var answerChoice_1;
var answerChoice_2;
var answerChoice_3;
var answerChoice_4;
var time;
var currentTime;
var timeId;
var timeOutId;
var answerChosen = false;
var trackedQuestions = [];
var wins = 0;
var losses = 0;

$("#main").hide();
$("#userMissed").hide();
document.getElementById("wins").innerHTML = wins;
document.getElementById("losses").innerHTML = losses;


function nextQuestion() {
  answerChosen = false;
  nextRound = false;
  $("#mainHeader").css("display", "none");
  $(".answerChoices").css("background-color", "transparent");
  randomQuestion = Math.floor(Math.random() * triviaQuestions.allQuestions.length);
  if (triviaQuestions.allQuestions.length === 0) {
    $("#main").empty();
    $("#mainHeader").show();
    $("#mainHeader").html("<h1> Game Over </h1>");
    var gameOverScreen = document.createElement("div");
    gameOverScreen.setAttribute("id", "gameOver");
    gameOverScreen.innerHTML = "<h2> Game Stats: <br> Wins:<span id='wins'></span><br> Losses:<span id='losses'></span></h2>";
    gameOverScreen.style.color = "white";
    gameOverScreen.style.textAlign = "center";
    document.getElementById("main").append(gameOverScreen);
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("wins").innerHTML = wins;
  }
  getQuesAns();
  displayQuesAns();
  time = 20;
  $("#timer").html(time);
  timeId = setInterval(timer, 1000);
}

function displayRightAns() {
  if ($("#answerChoice1").attr("value") === triviaQuestions.allQuestions[randomQuestion].answer) {
    $("#answerChoice1").css('background-color','red');
  }
  else if ($("#answerChoice2").attr("value") === triviaQuestions.allQuestions[randomQuestion].answer) {
    $("#answerChoice2").css('background-color','red');
  }
  else if ($("#answerChoice3").attr("value") === triviaQuestions.allQuestions[randomQuestion].answer) {
    $("#answerChoice3").css('background-color','red');
  }
  else if ($("#answerChoice4").attr("value") === triviaQuestions.allQuestions[randomQuestion].answer) {
    $("#answerChoice4").css('background-color','red');
  }
}

function timer() {
  time--;
  $("#timer").html(time);
  currentTime = parseInt(time);
  if(currentTime == 0) {
    answerChosen = true;
    clearInterval(timeId);
    $("#mainHeader").css("display", "inherit");
    $("#mainHeader").html("<h1> You ran out of time </h1>");
    setTimeout(nextQuestion, 2000);
    displayRightAns();
    triviaQuestions.allQuestions.splice(randomQuestion, 1);
    losses++;
    document.getElementById("losses").innerHTML = losses;
  }
}

function getQuesAns() {
  questionAsked = triviaQuestions.allQuestions[randomQuestion].question;
  answerChoice_1 = triviaQuestions.allQuestions[randomQuestion].answerChoices[0];
  answerChoice_2 = triviaQuestions.allQuestions[randomQuestion].answerChoices[1];
  answerChoice_3 = triviaQuestions.allQuestions[randomQuestion].answerChoices[2];
  answerChoice_4 = triviaQuestions.allQuestions[randomQuestion].answerChoices[3];
}

function displayQuesAns() {
  document.getElementById("questionBlank").innerHTML = questionAsked;
  document.getElementById("answerChoice1").innerHTML = answerChoice_1;
  document.getElementById("answerChoice2").innerHTML = answerChoice_2;
  document.getElementById("answerChoice3").innerHTML = answerChoice_3;
  document.getElementById("answerChoice4").innerHTML = answerChoice_4;

  document.getElementById("questionBlank").setAttribute("value", questionAsked);
  document.getElementById("answerChoice1").setAttribute("value", answerChoice_1);
  document.getElementById("answerChoice2").setAttribute("value", answerChoice_2);
  document.getElementById("answerChoice3").setAttribute("value", answerChoice_3);
  document.getElementById("answerChoice4").setAttribute("value", answerChoice_4);
}

$("#startGame").one("click", function(event) {
  $("#main").show();
  $("#startGame").hide();
  $("#mainHeader").css("display", "none");
  nextQuestion();
});

$(".answerChoices").on("click", function(event) {
  if(answerChosen === false) {
    if($(this).attr("value") === triviaQuestions.allQuestions[randomQuestion].answer) {
      answerChosen = true;
      clearInterval(timeId);
      $("#mainHeader").show();
      document.getElementById("mainHeader").innerHTML = "<h1> Congratulations </h1>";
      $(this).css("background-color", "red");
      clearInterval(timeId);
      setTimeout(nextQuestion, 5000);
      triviaQuestions.allQuestions.splice(randomQuestion, 1);
      wins++;
      document.getElementById("wins").innerHTML = wins;
    }
    else {
      displayRightAns();
      answerChosen = true;
      clearInterval(timeId);
      $("#mainHeader").css("display", "inherit");
      document.getElementById("mainHeader").innerHTML = "<h1> You Shall Not Pass! </h1>";
      clearInterval(timeId);
      setTimeout(nextQuestion, 5000);
      triviaQuestions.allQuestions.splice(randomQuestion, 1);
      losses++;      document.getElementById("losses").innerHTML = losses;
    }
  }
});
