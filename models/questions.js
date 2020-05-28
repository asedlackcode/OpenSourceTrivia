// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  var Questions = sequelize.define("Questions", {
    userName: DataTypes.STRING,

    question: DataTypes.STRING,

    correct_answer: DataTypes.STRING,
  });
  return Questions;
};
