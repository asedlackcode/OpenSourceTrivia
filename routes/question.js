if (process.env.NODE_ENV !== "production") {
    require("dotenv").config
}

const express = require("express");
const app = express.Router();

app.get('/questions', (req,res) => {
    res.render("questions", { name: '' })
});




module.exports = app;
