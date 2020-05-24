   var socket = io.connect();
   var chatMessages = document.querySelector(".chat");
   

 //listens for when server sends 'connect' on and emits to server
 socket.on('connect', function(data) {
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

 

 socket.on('userList', data => {
       $('#userList').append('<li>' + `${data.name}`+ "<br/>");
       console.log("userlist client")
 })

//listens for when server sends 'broad' and emits to server
 socket.on('broad', function(data) {
   //console.log(data)
    var currentTime = moment().format('h:mm a');
         $('#chat').append('<div class="card-panel red lighten-2">' + `<p class="meta">${data.name}: <span>${currentTime}</span></p><p class="text">` +
    data.message + "<br/>");

  
   //Scroll up
   chatMessages.scrollTop = chatMessages.scrollHeight;
   });


  //static card listen from server
socket.on('trivia', question => {
    console.log(question)
    outputTriviaQuestion(question);
})


//on click, sends 'messages' to all users
 $('#chatSubmit').on("click", function(e){
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
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("chatSubmit").click();
   input.value = ' ' ;
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

//function for outputTriviaQuestion
function outputTriviaQuestion(question) {
 document.getElementById("triviaDisplaySpan").innerText = question;
  }
  

        