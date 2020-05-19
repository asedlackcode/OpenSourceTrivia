$("#submit").on("click", function (event) {
  console.log("questions");
  event.preventDefault();
    console.log($("#user").val().trim());
  // make newQuestion obj
  var newQuestion = {
    username: $("#user").val().trim(),

    question: $("#quest").val().trim(),

    answer: $("#answer").val().trim(),
  };
  console.log(newQuestion);
  // send an AJAX POST-request with jQuery
  $.post("/api/new", newQuestion).then(function (data) {
    console.log(data);

    alert("You added a trivia question!!");
  });

  // empty each input box by replacing the value with an empty string
  $("#user").val("");
  $("#quest").val("");
  $("#answer").val("");
});
