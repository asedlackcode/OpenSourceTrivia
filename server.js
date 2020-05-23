var express = require("express");
var exphbs = require("express-handlebars");
var apiRoutes = require("./routes/apiRoutes.js");
var formatMessage = require("./utils/messages");

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

//Socket io
// var server = require("http").createServer(app);
// var io = require("socket.io").listen(server);
// users = [];
// connections = [];

// io.sockets.on("connection", function (socket){
//     connections.push(socket);
//     console.log("Connected: %s sockets connected", connections.length);

//     // Disconnect
//     socket.on("disconnect", function(data){
//       connections.splice(connections.indexOf(socket), 1);
//       console.log("Disconnected: %s sockets connected", connections.length);
//     });

//     //send message
//     socket.on("send message", function(data){
//       io.sockets.emit("new message", {msg: data});
//       console.log(data);
//     });
//     });

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

 


  //welcome current user -sends 'message' of Welcome! to client
  socket.emit('messageBot', formatMessage(chatBot, 'Welcome to Open Social Trivia!'));
 
   //Broadcase when user connects
   socket.broadcast.emit('messageBot', formatMessage(chatBot, 'A user has joined'));

   //Runs when client disconnects
   socket.on('disconnect', () => {
     io.emit('messageBot', formatMessage(chatBot,'A user has left'));
     
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

  


});




// Syncing our sequelize models and then starting our express app
db.sequelize.sync({
  force: false
}).then(function () {
  server.listen(PORT, function () {
    console.log("App listening on http://localhost:" + PORT);
  });
});