$(document).ready(function () {


  var film = "https://opentdb.com/api.php?amount=11&category=14&difficulty=easy&type=multiple";
  var tv = "https://opentdb.com/api.php?amount=10&category=14&difficulty=easy&type=multiple";
  var sports = "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";
  var compSci = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";
  // var answerSpan = document.querySelector("#answerInput").textContent;



  //event listners for each button clicked to call correct API
  $("#film").on("click", function () {

    $("#displayTrivia").empty();
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

  $("#userQ").on("click", function(){
    $("#displayTrivia").empty();
    generateTrivia("/api/userQuestions");
  });

  //pull questions and auto-gen cards for questions and answers from trivia API
  function generateTrivia(selection) {
    $.ajax({
      type: "GET",
      url: selection,
      dataType: "json",
    }).then(function (response) {

      console.log(response);
      var results = response.results;
      console.log(results);

      for (var i = 0; i < results.length; i++) {
        var col = $("<div>").addClass("col s6");
        var card = $("<div>").addClass("card blue-grey darken-1");
        var body = $("<div>").addClass("card-content");

        // var m1 = $("<p>").addClass("card-content").text("a. " + results[i].incorrect_answers[0]);
        // var m2 = $("<p>").addClass("card-content").text("b. " + results[i].incorrect_answers[1]);
        // var m3 = $("<p>").addClass("card-content").text("c. " + results[i].incorrect_answers[2]);
        var m4 = $("<p>").addClass("card-content").text("d. " + results[i].correct_answer);


        col.append(card.append(body.append(results[i].question, m4)));
        $("#displayTrivia").append(col);
      }
      console.log(results[0].question)


      //takes entry from input field and compares it with the correct answer
      $("#submitBtn").on("click", function checkAnswer(event) {
        event.preventDefault();
        var answer = $("#answerInput").val().trim();
        console.log(answer);
        var correctAnswer = results[0].correct_answer;
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