// var socket = io.connect();
// var chatMessages = document.querySelector(".chat");

// socket.on('connect', function(data) {
//  socket.emit('join', 'Hello World from client');
// });
// socket.on('broad', function(data) {
// console.log(data)
//       $('#chat').append('<div class="card-panel red lighten-2">' + `${data.name}: ` + data.message + "<br/>");

// //Scroll up
// chatMessages.scrollTop = chatMessages.scrollHeight;
// });
// //on click, sents 'messages' to all users
// $('#chatSubmit').on("click",function(e){
//   e.preventDefault();
//   {{!-- var message = $('#message').val(); --}}
//   var chat = {
//      email: $("#user-id").html(), 
//      message: $('#message').val()
//   }
//   socket.emit('messages', chat);
// });