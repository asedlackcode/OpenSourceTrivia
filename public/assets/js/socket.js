   var socket = io.connect();
   var chatMessages = document.querySelector(".chat");


   //listens for when server sends 'connect' on and emits to server
   socket.on('connect', function (data) {
       socket.emit('join', 'Hello World from client');
       var onlineUsers = {
           email: $("#user-id").html()
       }
       socket.emit('joinRoom', onlineUsers);

   });

   //listens from server 
   socket.on('messageBot', message => {
       outputMessage(message);

   })

   //listsns from server when 'userListRefresh' is emitted
   socket.on('userListRefresh', data => {
       let userUL = document.getElementById('userList');
       let currentUserLeaving = data.name;
       let users = userUL.children;
       //let userExist = false;

       userUL.removeChild(currentUserLeaving);
   })

   //listsns from server when 'userlist' is emitted
   socket.on('userList', data => {
       let userUL = document.getElementById('userList');
       let newUser = data.name;
       let users = userUL.children;
       let userExist = false;

       console.log("Printing all current Users: ");
       for (let i = 0; i < users.length; i++) {
           console.log(users[i].innerText);
       }

       for (let i = 0; i < users.length; i++) {
           let currentUserName = users[i].innerText;
           console.log("currentusername: " + currentUserName)
           if (currentUserName === newUser) {
               console.log(newUser + " already exists!");
               userExist = true;
               break;
           }
       }

       if (!userExist) {
           let newJoinedUser = document.createElement("LI");
           newJoinedUser.appendChild(document.createTextNode(newUser));
           userUL.appendChild(newJoinedUser);
       }


       console.log("Printing all Users Online again!: ");
       for (let i = 0; i < users.length; i++) {
           console.log(users[i].innerText);
       }

       // $('#userList').append('<li>' + `${data.name}`+ "<br/>");

   })

   //listens for when server sends 'broad' and emits to server
   socket.on('broad', function (data) {
       //console.log(data)
       var currentTime = moment().format('h:mm a');
       $('#chat').append('<div class="card-panel red lighten-2">' + `<p class="meta">${data.name}: <span>${currentTime}</span></p><p class="text">` +
           data.message + "<br/>");


       //Scroll up
       chatMessages.scrollTop = chatMessages.scrollHeight;
   });

   //listens for when server sends 'userLeft' and emits to server
   //  socket.on('userLeft', function(data) {
   //     //console.log(data)
   //      var currentTime = moment().format('h:mm a');
   //           $('#chat').append('<div class="card-panel red lighten-2">' + `<p class="meta">Chat Bot: <span>${currentTime}</span></p><p class="text">` +
   //           `${data.name}` + data.mesaage + "<br/>");
   //   //Scroll up
   //   chatMessages.scrollTop = chatMessages.scrollHeight;
   // });

   //when button clicks, send server trivia request
   $("#triviaQ").on("click", function () {
       $("#staticCard").empty();
       generateTriviaQ();

   });

   //static card listen from server
   socket.on('trivia', function (question, answer) {
       console.log(question)
       console.log(answer)
       outputTriviaQuestion(question, answer);
   })


   //on click, sends 'messages' to all users
   $('#chatSubmit').on("click", function (e) {
       e.preventDefault();
       var chat = {
           email: $("#user-id").html(),
           message: $('#message').val()
       }
       socket.emit('messages', chat);
       //clear input
       //document.getElementById("message").value = ' ';
       //console.log(document.getElementById("message").value)
   });


   //listen for when user click 'enter key' , submit input and clear input  
   var input = document.getElementById("message");
   input.addEventListener("keyup", function (event) {
       if (event.keyCode === 13) {
           event.preventDefault();
           document.getElementById("chatSubmit").click();
           input.value = ' ';
           document.getElementById('message').focus();
       }





   });


   //output message by messageBot to DOM
   function outputMessage(message) {

       const div = document.createElement('div');
       div.className = 'card-panel red lighten-2 message';
       div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p><p class="text">
    ${message.text}
    </p>`;
       document.getElementById("chat").appendChild(div);
       chatMessages.scrollTop = chatMessages.scrollHeight;
   }




   //apicall
   var film = "https://opentdb.com/api.php?amount=1&category=11&difficulty=easy&type=multiple";

   function generateTriviaQ() {
       $.ajax({
           type: "GET",
           url: film,
           dataType: "json",
       }).then(function (response) {
           $("#staticCard").empty();
           console.log(response);
           var results = response.results;

           var question = results[0].question;
           var answer = results[0].correct_answer;


           socket.emit('trivia', {
               question,
               answer
           });
           console.log(question);
           console.log(answer);




       })
   }

   //listen for 'apiQandA'
   socket.on('apiQandA', function (question, answer) {
       console.log(question);
       console.log(answer);
       outputTriviaQuestion(question, answer);
   })

   //listen for servier 'display apitrivia'
   function outputTriviaQuestion(question, answer) {
       console.log("i am in outputTriviaQuestion");
       const triviaDiv = document.getElementById("triviaDisplaySpan");
       var txt1 = "<p>Text.</p>"; // Create element with HTML 
       var txt2 = $("<p></p>").text("Text."); // Create with jQuery
       var txt3 = document.createElement("p"); // Create with DOM
       txt3.innerHTML = "Text.";
       triviaDiv.append(txt1, txt2, txt3);
       // triviaDiv.className = answer;
       // triviaDiv.innerText = question;

   }