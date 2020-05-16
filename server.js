var express = require("express");
var PORT = process.env.PORT || 8000;
var app = express();

// Requiring our models for syncing
var db = require("./models/scores.js");
var db = require("./models/login.js");
var db = require("./models/questions.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});