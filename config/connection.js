// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL

// Dependencies
const Sequelize = require("sequelize");

// Creates mySQL connection using Sequelize.
<<<<<<< HEAD
const sequelize = new Sequelize('trivia_db', 'root', 'pollyServer1', {
=======
const sequelize = new Sequelize('trivia_db', 'root', 'hello1234', {
>>>>>>> 763db8f8b1bb55add670cd17b1b9a922557b8e60
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

// Exports the connection for other files to use
module.exports = sequelize;
