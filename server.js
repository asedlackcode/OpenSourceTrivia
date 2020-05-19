var express = require("express");
var exphbs = require("express-handlebars");
var apiRoutes = require("./routes/apiRoutes.js"); 
var passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// Initialize the app and create port
var PORT = process.env.PORT || 8000;
var app = express();

app.use(express.static("public"));

// Set up body parsing, static, and route middleware
// Requiring our models for syncing
var db = require("./models/scores.js");
var db = require("./models/user.js");
var db = require("./models/questions.js");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser());
app.use(require('connect-multiparty')());
app.use(cookieParser());
app.use(session({ secret: 'super-secret' }));
 
app.use(passport.initialize());
app.use(passport.session());
 
passport.use(User.createStrategy());
 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use("/api", apiRoutes);


var ExHb = require("express-handlebars");

app.engine('handlebars', ExHb({ defaultLayout: 'main' }) )
app.set('view engine', 'handlebars');


var loginRoute = require("./routes/login");

app.use(loginRoute);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
  });
});
