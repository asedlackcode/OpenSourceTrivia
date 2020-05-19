$(document).ready(function () {


  var film = "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple";
  var tv = "https://opentdb.com/api.php?amount=10&category=14&difficulty=easy&type=multiple";
  var sports = "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";
  var compSci = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";
  // var answerSpan = document.querySelector("#answerInput").textContent;
  var currentQuestion = 0;
  var score = 0;


  //event listners for each button clicked to call correct API
  $("#film").on("click", function () {

    $("#displayTrivia").empty();
    console.log(film);
    
    generateTrivia(film);
  });

  $("#tv").on("click", function () {
    $("#displayTrivia").empty();
    generateTrivia(tv);
  });

  $("#sports").on("click", function () {
    $("#displayTrivia").empty();
    generateTrivia(sports);
  });

  $("#compSci").on("click", function () {
    $("#displayTrivia").empty();
    generateTrivia(compSci);
  });

  //pull questions and auto-gen cards for questions and answers from trivia API
  function generateTrivia(selection) {
    $.ajax({
      type: "GET",
      url: selection,
      dataType: "json",
    }).then(function (response) {
      $("#displayTrivia").empty();
      console.log(response);
      var results = response.results;
      var current = results[currentQuestion].question;
      //var currentA = results[currentQuestion].correct_answer;
      //var current = results[currentQuestion];

      //for (var i = 0; i < results.length; i++) {
        var col = $("<div>").addClass("col s6");
        var card = $("<div>").addClass("card blue-grey darken-1");
        var body = $("<div>").addClass("card-content");

        // var m1 = $("<p>").addClass("card-content").text("a. " + results[i].incorrect_answers[0]);
        // var m2 = $("<p>").addClass("card-content").text("b. " + results[i].incorrect_answers[1]);
        // var m3 = $("<p>").addClass("card-content").text("c. " + results[i].incorrect_answers[2]);
        var m4 = $("<p>").addClass("card-content").text("d. " + results[currentQuestion].correct_answer);


        col.append(card.append(body.append(current, m4)));
        $("#displayTrivia").append(col);
     // }
      console.log(results[currentQuestion].question)


      //takes entry from input field and compares it with the correct answer
      $("#submitBtn").on("click", function checkAnswer(event) {
        event.preventDefault();
        $("#displayAnswer").empty();
        var answer = $("#answerInput").val().trim().toLowerCase();
        console.log(answer);
        var correctAnswer = results[currentQuestion].correct_answer.toLowerCase();
        if (answer === correctAnswer) {
          
          console.log(correctAnswer);
          console.log("Correct!");
          var col = $("<div>").addClass("col s12");
          var card = $("<div>").addClass("card-panel green");
          var body = $("<div>").addClass("card-content");
          var correct = $("<p>").addClass("card-content").text("Correct!");
          var finalAnswer = $("<span>").addClass("card-content").text(correctAnswer);
          col.append(card.append(body.append(correct, finalAnswer)));
          $("#displayAnswer").append(col);
          setTimeout( function() {$("#displayAnswer").empty()}, 3000);
          currentQuestion++;
          score++;
          $(".score").text(score);
          console.log(currentQuestion);
          
          generateTrivia(selection);
        } else {
          var col = $("<div>").addClass("col s12");
          var card = $("<div>").addClass("card-panel red");
          var body = $("<div>").addClass("card-content");
          var wrong = $("<p>").addClass("card-content").text("Oops! Try Again");
          //var finalAnswer = $("<span>").addClass("card-content").text(correctAnswer);
          col.append(card.append(body.append(wrong)));
          $("#displayAnswer").append(col);
          setTimeout( function() {$("#displayAnswer").empty()}, 3000);
        }
      });

    })









  };




  //});

  //clearing function to previous inputs
  var answerClear = document.getElementById('displayAnswer');
  var reSubmitBtn = document.getElementById('submitBtn');

  reSubmitBtn.addEventListener('click', function () {
    answerClear.innerHTML = "";


  });


  var seconds = document.getElementById("countdown").textContent;
  var countdown = setInterval(function () {
    seconds--;
    document.getElementById("countdown").textContent = seconds;
    if (seconds <= 0) clearInterval(countdown);
  }, 1000);






});