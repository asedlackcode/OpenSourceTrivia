$(document).ready(function () {


  var film = "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple";
  var tv = "https://opentdb.com/api.php?amount=10&category=14&difficulty=easy&type=multiple";
  var sports = "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";
  var compSci = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";
  // var answerSpan = document.querySelector("#answerInput").textContent;
  var currentQuestionIndex = 0;
  var score = 0;
  
  //event listners for each button clicked to call correct API
  $("#film").on("click", function () {
    var sec = 2 ;
    var time = setInterval(myTimer, 1000);
    $("#displayTrivia").empty();
    console.log(film);
    generateTrivia(film);
     function myTimer() {
      
      var time = setInterval(myTimer, 1000);
      $('.timer').text(sec + "sec left");
        sec--;
     if (sec == -1) {
        clearInterval(time);
        alert("Your time is up!");
        generateTrivia(film);
        
        //add card "time's up next question"
    }
  }

    myTimer();
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
      $("#displayTrivia").empty();
      console.log(response);
      var results = response.results;
      var currentQuestion = results[currentQuestionIndex].question;
      console.log(results);
      //var current = results[currentQuestionIndex].question;
      //var currentA = results[currentQuestion].correct_answer;
      //var current = results[currentQuestion];

      //for (var i = 0; i < results.length; i++) {
        var col = $("<div>").addClass("col s9 m9 l9");
        var card = $("<div>").addClass("card blue-grey darken-1");
        var body = $("<div>").addClass("card-content");

        // var m1 = $("<p>").addClass("card-content").text("a. " + results[i].incorrect_answers[0]);
        // var m2 = $("<p>").addClass("card-content").text("b. " + results[i].incorrect_answers[1]);
        // var m3 = $("<p>").addClass("card-content").text("c. " + results[i].incorrect_answers[2]);
        var m4 = $("<p>").addClass("card-content").text("d. " + results[currentQuestionIndex].correct_answer);


        col.append(card.append(body.append(currentQuestion, m4)));
        $("#displayTrivia").append(col);
     // }
      console.log(results[currentQuestionIndex].question)


      //takes entry from input field and compares it with the correct answer
      $("#chatSubmit").on("click", async function checkAnswer(event) {
        event.preventDefault();
        $("#displayAnswer").empty();
        var answer = $("#message").val().trim();
        console.log($("#message").message);
        var correctAnswer = results[currentQuestionIndex].correct_answer;
        console.log("answer: " + answer);
        console.log("correct answer: " + correctAnswer);

        if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
          
          console.log(correctAnswer);
          console.log("Correct!");
          var col = $("<div>").addClass("col s12 m12 l12");
          var card = $("<div>").addClass("card-panel green");
          var body = $("<div>").addClass("card-content");
          var correct = $("<p>").addClass("card-content").text("Correct!");
          var finalAnswer = $("<span>").addClass("card-content").text(correctAnswer);
          col.append(card.append(body.append(correct, finalAnswer)));
          $("#displayAnswer").append(col);
          setTimeout( function() {$("#displayAnswer").empty()}, 3000);
          currentQuestionIndex++;
          score++;
          $(".score").text(score);
          console.log(currentQuestionIndex);

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
         //clear messageForm
         await document.getElementById('messageForm').reset();
         await document.getElementById('message').focus();
      });

    })









  };




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