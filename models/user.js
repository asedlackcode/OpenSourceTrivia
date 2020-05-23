// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
// var sequelize = require("../config/connection.js");

// // Creates a "Scores" model that matches up with DB
// var Login = sequelize.define("login", {
  
//     // the usereName gets saved as a string
//   userName: Sequelize.STRING,

//   // the user score gets saved as an integer
//   password: Sequelize.STRING
// })

// // Syncs with DB
// Login.sync();

// // Makes the Login model available for other files (will also create a table)
// module.exports = Login;


module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    
    email : DataTypes.STRING,
    name  : DataTypes.STRING,
    password : DataTypes.STRING

  });

  return User;
};