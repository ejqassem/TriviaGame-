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
    answerChoices: ["Elvish Rope", "Three strands of her hair", "A pint crafted from wood", "a dagger"],
    answer: "Three strands of her hair"
  }, {
    question: "Who said the following quote: \"What about Elevenses? Luncheon? Afternoon Tea? Dinner? Supper? He knows about them, doesn't he'?\"",
    answerChoices: ["Merry", "Elrond", "Pippin", "Bombur"],
    answer: "Pippin"
  } , {
    question: "Where does the council of Elrond convene in the Lord of the Rings Trilogy?",
    answerChoices: ["Rivendell", "Moria", "Mirkwood", "The Shire"],
    answer: "Rivendell"
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

var hobbitTheme = document.createElement("audio");
hobbitTheme.src = "assets/music/hobbits-theme.mp3";
hobbitTheme.currentTime = 4;
hobbitTheme.play();


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
    $("#startGame").off();
    var gameOverScreen = document.createElement("div");
    gameOverScreen.setAttribute("id", "gameOver");
    gameOverScreen.innerHTML = "<h2> Game Stats: <br> Wins:<span id='wins'></span><br> Losses:<span id='losses'></span></h2>";
    gameOverScreen.style.color = "white";
    gameOverScreen.style.textAlign = "center";
    document.getElementById("main").append(gameOverScreen);
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("wins").innerHTML = wins;
    if ( wins === 0) {
      var gandalf = document.createElement("video");
      gandalf.src = "assets/images/gandalf.mp4";
      gandalf.style.position = "relative";
      gandalf.style.top = "200px";
      gandalf.style.zIndex = 2;
      gandalf.autoplay = true;
      gandalf.loop = true;
      document.getElementById("mainHeader").append(gandalf);
    }
    if ( wins === 1 || wins === 2 || wins === 3) {
      var pippen = document.createElement("video");
      pippen.src = "assets/images/pippen.mp4";
      pippen.style.position = "relative";
      pippen.style.top = "150px";
      pippen.style.zIndex = 2;
      pippen.autoplay = true;
      pippen.loop = true;
      document.getElementById("mainHeader").append(pippen);
    }
    else if (wins === 4 || wins === 5) {
      var fellowship = document.createElement("video");
      fellowship.src = "assets/images/congrats2.mp4";
      fellowship.style.position = "relative";
      fellowship.style.top = "200px";
      fellowship.style.zIndex = 2;
      fellowship.autoplay = true;
      fellowship.loop = true;
      document.getElementById("mainHeader").append(fellowship);
    }
    resetGame();
    $("#resetGame").show();
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

// function resetGame() {
//   losses = 0;
//   wins = 0;
//   $("#timer").empty();
//   clearInterval(timeId);
//   triviaQuestions = {
//     allQuestions: [{
//       question : "Who said \"Nine Companions. So be it. You shall be the fellowship of the ring.\"",
//       answerChoices: ["Elrond", "Gandalf", "Aargorn", "Celeborn"],
//       answer: "Elrond"
//     }, {
//       question: "How many rings of power were forged in the second age?",
//       answerChoices: ["1", "19", "20", "13"],
//       answer: "20"
//     }, {
//       question: "\"In Fellowship of the Ring\", what gift does Lady Galadriel give Gimli before the fellowship leaves Lothlorien?",
//       answerChoices: ["Elvish Rope", "Three strands of her hair", "A pint crafted from wood", "a dagger"],
//       answer: "Three strands of her hair"
//     }, {
//       question: "Who said the following quote: \"What about Elevenses? Luncheon? Afternoon Tea? Dinner? Supper? He knows about them, doesn't he'?\"",
//       answerChoices: ["Merry", "Elrond", "Pippin", "Bombur"],
//       answer: "Pippin"
//     } , {
//       question: "Where does the council of Elrond convene in the Lord of the Rings Trilogy?",
//       answerChoices: ["Rivendell", "Moria", "Mirkwood", "The Shire"],
//       answer: "Rivendell"
//     }]
//   };
//
// }

function timer() {
  time--;
  $("#timer").html(time);
  currentTime = parseInt(time);
  if(currentTime === 0) {
    answerChosen = true;
    clearInterval(timeId);
    $("#mainHeader").css("display", "inherit");
    $("#mainHeader").html("<h1> You ran out of time </h1>");
    setTimeout(nextQuestion, 3000);
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

// $("#resetGame").one("click", function(event) {
//     $("#main").show();
//     $("#startGame").hide();
//     $("#resetGame").hide();
//     $("#mainHeader").css("display", "none");
//     nextQuestion();
// });

$("#startGame").one("click", function(event) {
  $("#main").show();
  $("#startGame").hide();
  $("#resetGame").hide();
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
      $(this).css("background-color", "green");
      clearInterval(timeId);
      setTimeout(nextQuestion, 3000);
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
      setTimeout(nextQuestion, 3000);
      triviaQuestions.allQuestions.splice(randomQuestion, 1);
      losses++;
      document.getElementById("losses").innerHTML = losses;
    }
  }
});
