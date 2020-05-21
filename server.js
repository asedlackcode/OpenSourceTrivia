var express = require("express");
var exphbs = require("express-handlebars");
var apiRoutes = require("./routes/apiRoutes.js"); 



// Initialize the app and create port
var PORT = process.env.PORT || 8000;
var app = express();


app.use(express.static("public"));

// Set up body parsing, static, and route middleware
// Requiring our models for syncing
// var db = require("./models/scores.js");
// var db = require("./models/login.js");
// var db = require("./models/questions.js");
// Requiring our models for syncing
var db = require("./models");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var ExHb = require("express-handlebars");

app.engine('handlebars', ExHb({ defaultLayout: 'main' }) )
app.set('view engine', 'handlebars');


var loginRoute = require("./routes/login");
var questionRoute = require("./routes/question");


app.use(loginRoute);
app.use("/api", apiRoutes);
app.use('/', questionRoute)

//Socket io
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
users = [];
connections = [];

io.sockets.on("connection", function (socket){
    connections.push(socket);
    console.log("Connected: %s sockets connected", connections.length);

    // Disconnect
    socket.on("disconnect", function(data){
      connections.splice(connections.indexOf(socket), 1);
      console.log("Disconnected: %s sockets connected", connections.length);
    });
    
    //send message
    socket.on("send message", function(data){
      io.sockets.emit("new message", {msg: data});
      console.log(data);
    });
    });


// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
  });
});
