// Sequelize (capital) references the standard library
var Sequelize = require("sequelize"),
passportLocalSequelize = require("passport-local-sequelize");

// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Scores" model that matches up with DB
var User = passportLocalSequelize.defineUser(sequelize, {

  //name: Sequelize.STRING,
  
    // the usereName gets saved as a string
  email: Sequelize.STRING,
  
  // the user score gets saved as an integer
  //password: Sequelize.STRING,

});

// Syncs with DB
User.sync();

// Makes the Login model available for other files (will also create a table)
module.exports = User;