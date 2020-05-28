$(document).ready(function () {
  var film =
    "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple";
  var tv =
    "https://opentdb.com/api.php?amount=10&category=14&difficulty=easy&type=multiple";
  var sports =
    "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";
  var compSci =
    "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";
  // var answerSpan = document.querySelector("#answerInput").textContent;
  var currentQuestionIndex = 0;
  var score = 0;

  //event listners for each button clicked to call correct API
  $("#film").on("click", function () {
    $("#displayTrivia").empty();
    console.log(film);

    generateTrivia(film);
    $("#message").focus();
  });

  $("#tv").on("click", function () {
    $("#displayTrivia").empty();
    generateTrivia(tv);
    $("#message").focus();
  });

  $("#sports").on("click", function () {
    $("#displayTrivia").empty();
    generateTrivia(sports);
    $("#message").focus();
  });

  $("#compSci").on("click", function () {
    $("#displayTrivia").empty();
    generateTrivia(compSci);
    $("#message").focus();
  });

  $("#userQ").on("click", function () {
    $("#displayTrivia").empty();
    generateTrivia("/api/userQuestions");
    $("#message").focus();
  });

  questionArray = [];

  //pull questions and auto-gen cards for questions and answers from trivia API
  function generateTrivia(selection) {
    $.ajax({
      type: "GET",
      url: selection,
      dataType: "json",
    }).then(function gamestart(response) {
      //var sec = 60;
      //var time = setInterval(myTimer, 1000);
      // function myTimer() {
      //   $(".timer").text(sec + "sec left");
      //   sec--;
      //   if (sec == -1) {
      //     clearInterval(time);
      //     $("#displayTrivia").empty();
      //     var col = $("<div>").addClass("center col s12 m4 l12");
      //     var card = $("<div>").addClass("card red accent-4");
      //     var body = $("<div>").addClass("card-content");
      //     var text = $("<h1>").text("TIME'S UP!");
      //     var scoreBtn = $("<button>").addClass("resetBtn waves-effect waves-light btn");
      //     $(scoreBtn).text("Reset Game")
      //     $(text).addClass("white-text")
      //     $(text).attr("color: white;")
      //     col.append(card.append(body.append(text, scoreBtn)));
      //     $("#displayTrivia").append(col);

      //     $(".resetBtn").on("click", function() {
      //       $("#displayTrivia").empty();
      //     })
      //   }
      // 
      // myTimer()

      $("#displayTrivia").empty();
      $("#message").focus();
      console.log("this is the response:", response);
      var results = response.results;
      //add results into an array
      questionArray.push(results);
      var q = questionArray[0][currentQuestionIndex].question;
      var a = questionArray[0][currentQuestionIndex].correct_answer;
      console.log(q);
      //var currentQuestion = questionArray[currentQuestionIndex].question;
      //var currentQuestion = results[currentQuestionIndex].question;
      console.log(questionArray);
      //var current = results[currentQuestion].question;
      //var currentA = results[currentQuestion].correct_answer;
      //var current = results[currentQuestion];

      //for (var i = 0; i < results.length; i++) {
      var col = $("<div>").addClass("col s9 m9 l9");
      var card = $("<div>").addClass("card blue-grey darken-1");
      var body = $("<div>").addClass("card-content");

      // var m1 = $("<p>").addClass("card-content").text("a. " + results[i].incorrect_answers[0]);
      // var m2 = $("<p>").addClass("card-content").text("b. " + results[i].incorrect_answers[1]);
      // var m3 = $("<p>").addClass("card-content").text("c. " + results[i].incorrect_answers[2]);
      var m4 = $("<p>")
        .addClass("card-content")
        .text("d. " + a);

      col.append(card.append(body.append(q, m4)));
      $("#displayTrivia").append(col);
      // }
      //console.log(questionArray[currentQuestionIndex].question);

    
      //takes entry from input field and compares it with the correct answer
      $("#chatSubmit").on("click", async function checkAnswer(event) {
        event.preventDefault();
        $("#displayAnswer").empty();
        var answer = $("#message").val().trim();
        console.log($("#message").message);
        var correctAnswer =
          questionArray[0][currentQuestionIndex].correct_answer;
        console.log("answer: " + answer);
        console.log("correct answer: " + correctAnswer);

        if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
          console.log(correctAnswer);
          console.log("Correct!");
          var col = $("<div>").addClass("col s12 m12 l12");
          var card = $("<div>").addClass("card-panel green");
          var body = $("<div>").addClass("card-content");
          var correct = $("<p>").addClass("card-content").text("Correct!");
          var finalAnswer = $("<span>")
            .addClass("card-content")
            .text(correctAnswer);
          col.append(card.append(body.append(correct, finalAnswer)));
          $("#displayAnswer").append(col);
          setTimeout(function () {
            $("#displayAnswer").empty();
          }, 3000);
          currentQuestionIndex++;
          score++;
          $(".score").text(score);
          console.log(currentQuestionIndex);

          //clear messageForm
          await document.getElementById("messageForm").reset();

          gamestart(questionArray);
        } else {
          var col = $("<div>").addClass("col s12");
          var card = $("<div>").addClass("card-panel red");
          var body = $("<div>").addClass("card-content");
          var wrong = $("<p>").addClass("card-content").text("Oops! Try Again");
          //var finalAnswer = $("<span>").addClass("card-content").text(correctAnswer);
          col.append(card.append(body.append(wrong)));
          $("#displayAnswer").append(col);
          setTimeout(function () {
            $("#displayAnswer").empty();
          }, 3000);
        }
      })
      
      });
  }
  
  //});

  //clearing function to previous inputs
  // var answerClear = document.getElementById('message');
  // var reSubmitBtn = document.getElementById('chatSubmit');

  // reSubmitBtn.addEventListener('click', function () {
  //   answerClear.value = "";

  // });

  var seconds = document.getElementById("countdown").textContent;
  var countdown = setInterval(function () {
    seconds--;
    document.getElementById("countdown").textContent = seconds;
    if (seconds <= 0) clearInterval(countdown);
  }, 1000);
});
