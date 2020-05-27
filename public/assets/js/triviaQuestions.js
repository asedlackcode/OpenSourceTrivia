//function for outputTriviaQuestion

function outputTriviaQuestion(question, answer) {
    const triviaDiv = document.getElementById("triviaDisplaySpan");
    triviaDiv.className = answer;
    triviaDiv.innerText = question;
  
}

module.exports = outputTriviaQuestion;

