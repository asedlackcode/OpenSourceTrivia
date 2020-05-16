// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Scores" model that matches up with DB
var Questions = sequelize.define("questions", {
  
    // the usereName gets saved as a string
  userName: Sequelize.STRING,
  
  // the user score gets saved as an integer
  question: Sequelize.STRING,

  // user answer to their question
  answer: Sequelize.STRING
});

// Syncs with DB
Questions.sync();

// Makes the Questions Model available for other files (will also create a table)
module.exports = Questions;