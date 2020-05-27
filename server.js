var express = require("express");
var exphbs = require("express-handlebars");
var apiRoutes = require("./routes/apiRoutes.js");
var formatMessage = require("./utils/messages");
var outputTriviaQuestion = require("./public/assets/js/triviaQuestions")

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

//runs when Client connects
io.on('connection', function (socket) {
  console.log('Client connected...');

  socket.on('joinRoom', function(data){
    UserTransactions.findUserByEmail(data.email, function(user){
      io.emit('userList', {
      name : user.name
      
    })

    socket.emit('userList', {
      name : user.name
      
    })
 
    
  })
})

  //welcome current user -sends 'message' of Welcome! to single client thats connecting
  socket.emit('messageBot', formatMessage(chatBot, 'Welcome to Open Social Trivia!'));
 
   //Broadcase when user connects to everyone except user thats connection
   socket.broadcast.emit('messageBot', formatMessage(chatBot, 'A user has joined'));

   //Runs when client disconnects
   socket.on('disconnect', function (data) {
    //UserTransactions.findUserByEmail(data.email, function(user){

      //console.log("user that sent message", user)

    //   socket.emit('userLeft', {
    //     name : user.name,
    //   message : "has let the Chat"
      
    //   })

    //   socket.broadcast.emit('userLeft', {
    //     name : user.name,
    //   message : "has let the Chat"
        
    //   })

    // })
    // console.log(user.name)
    //  })
    UserTransactions.findUserByEmail(data.email, function(user){
      socket.broadcast.emit('messageBot', formatMessage(chatBot,`A ${user} user has left the Chat`)), {
      name : user.name
    }
    socket.emit('userListRefresh', {
      name : user.name
      
    })
     
    })
 
  })


   socket.on('joinRoom', function(data){
    UserTransactions.findUserByEmail(data.email, function(user){
      io.emit('userList', {
      name : user.name,
      message : data.message
    })

    // socket.broadcast.emit('userList', {
    //   name : user.name, 
    //   message : data.message
    // })
    
  })

   })
    

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
  });

  //static card emit to client
  //io.emit('trivia', "Who is the star of the AMC series Breaking Bad?","Walter White");

  socket.on('trivia', function(data){
    console.log(data);
    socket.emit('apiQandA',{
      question : data.question,
      answer : data.answer
    })
  });
  
  


});




// Syncing our sequelize models and then starting our express app
db.sequelize.sync({
  force: false
}).then(function () {
  server.listen(PORT, function () {
    console.log("App listening on http://localhost:" + PORT);
  });
});