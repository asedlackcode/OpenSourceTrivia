var express = require("express");
var exphbs = require("express-handlebars");
var apiRoutes = require("./routes/apiRoutes.js");
var formatMessage = require("./utils/messages");
var outputTriviaQuestion = require("./public/assets/js/triviaQuestions")
var {userJoin, getCurrentUser, userLeaves} = require("./public/assets/js/users")

let UserTransactions = require('./transactions/user')


// Initialize the app and create port
var PORT = process.env.PORT || 8000;
var app = express();


app.use(express.static("public"));

// Requiring our models for syncing
var db = require("./models");

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

var ExHb = require("express-handlebars");

var loginRoute = require("./routes/login");
var questionRoute = require("./routes/question");


app.use(loginRoute);
app.use("/api", apiRoutes);
app.use('/', questionRoute)

const server = require('http').createServer(app);
const io = require('socket.io')(server);
const chatBot = 'Chat Bot';

app.use(express.static(__dirname + '/node_modules'));
app.get('/', function (req, res, next) {
  // res.sendFile(__dirname + '/test.html');
});



let activeUsers = [];

//runs when Client connects
io.on('connection', function (socket) {
  console.log('Client connected...');

  socket.on('joinRoom', function(data){
    UserTransactions.findUserByEmail(data.email, function(user){
    //   io.emit('userList', {
    //   name : user.name
    // })
    

    // console.log("activeUsers: " + activeUsers)
    // console.log("data: "+ data)
    // console.log("username: " + user.name)
  
    const user1 = userJoin({
      socketID: socket.id,
      name: user.name,
      email: user.email
    
  });

  //console.log("line 78" + user1.email)
  
   
  

    io.emit('userListRefresh2', {
      activeUsers : user1
    })

    
     //Broadcast when user connects to everyone except user thats connection
     socket.broadcast.emit('messageBot2', {
        name : user.name,
        message : "has joined the chat"
     
    })
    
    
  })
})

  //welcome current user -sends 'message' of Welcome! to single client thats connecting
  
  socket.emit('messageBot', formatMessage(chatBot, 'Welcome to Open Social Trivia!'));
 
 
   //socket.broadcast.emit('messageBot', formatMessage(chatBot, 'A user has joined'));

   //Runs when client disconnects
   socket.on('disconnect', function () {
    const userLeft = userLeaves(socket.id);
    socket.broadcast.emit('messageBot', formatMessage(chatBot, 'A User has left the Chat'));

    
   
    
    // UserTransactions.findUserByEmail(data.email, function(user){

      function userDisconnect (activeUsers){
        return activeUsers.socketID === socket.id} 

      //console.log("line 112: " + activeUsers.find(socketID))
     
    //   socket.broadcast.emit('messageBot2', {
    //     name : user.name,
    //     message : "has left the chat"
     
     //})

   
    })
  
   
     
    // console.log("line 101 activeUsers when leaving: " + activeUsers)
      
    //   console.log("line 103 username leaving: " + user)
    //   let position = activeUsers.indexOf('user.name')
    //   console.log("position: "  + position);

    // if (position >= 0)
	  // activeUsers.splice(position, 1);
    // console.log("current active users: " + activeUsers);
      
  
    //   io.emit('userListRefresh2', {
        
    //     activeUsers : activeUsers
    //   })
     
   
      
 

    

  socket.on('messages', function (data) {

    //console.log('data recieved', data)

    UserTransactions.findUserByEmail(data.email, function(user){

      //console.log("user that sent message", user)

      socket.emit('broad', {
        name : user.name,
        message : data.message
      })

      socket.broadcast.emit('broad', {
        name : user.name, 
        message : data.message
      })

    })
  })
  

  //static card emit to client
  //io.emit('trivia', "Who is the star of the AMC series Breaking Bad?","Walter White");

  socket.on('trivia', function(data){
    
    io.emit('apiQandA', {
      question : data.question,
      answer : data.answer
    })
    console.log(data);
  });
  
  
  //when someone gets correct answer
  socket.on('correct', function(message, data){
    UserTransactions.findUserByEmail(data.email, function(user){
 
    io.emit('messageBot3', {
      name : user.name,
      message : `got the correct answer: ${message}!`
      
   
  })
  console.log("im server line 198")
  })
})
 
});




// Syncing our sequelize models and then starting our express app
db.sequelize.sync({
  force: false
}).then(function () {
  server.listen(PORT, function () {
    console.log("App listening on http://localhost:" + PORT);
  });
});