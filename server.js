var express = require("express");
var exphbs = require("express-handlebars");
var apiRoutes = require("./routes/apiRoutes.js"); 



// Initialize the app and create port
var PORT = process.env.PORT || 8000;
var app = express();

app.use(express.static("public"));

// Set up body parsing, static, and route middleware
// Requiring our models for syncing
var db = require("./models/scores.js");
var db = require("./models/login.js");
var db = require("./models/questions.js");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
