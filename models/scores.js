// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Scores" model that matches up with DB
var Scores = sequelize.define("scores", {
  // the usereName gets saved as a string
  userName: Sequelize.STRING,
  // the user score gets saved as an integer
  score: Sequelize.INTEGER,
  // the date posted
  date: Sequelize.DATE

});

// Syncs with DB
Scores.sync();

// Makes the Scores Model available for other files (will also create a table)
module.exports = Scores;