const router = require("express").Router();
// const Questions = require('../models/questions');
var db = require("../models");

// GET "/api/trivia" responds with all notes from the database
router.get("/trivia", checkAuthenticated, function (req, res) {
  res.render("index", res);
  //     .getQuestions()
  //     .then(notes => res.json(notes))

  // .catch(err => res.status(500).json(err));
});

// router.post("/notes", (req, res) => {
//   store
//     .addNote(req.body)
//     .then((note) => res.json(note))
//     .catch(err => res.status(500).json(err));
// });

// // DELETE "/api/notes" deletes the note with an id equal to req.params.id
// router.delete("/notes/:id", function(req, res) {
//   store
//     .removeNote(req.params.id)
//     .then(() => res.json({ ok: true }))
//     .catch(err => res.status(500).json(err));
// });

// add a question
router.post("/new", function (req, res) {
  console.log("Question Data:");
  console.log(req.body);
  db.Questions.create({
    username: req.body.username,
    question: req.body.question,
    answer: req.body.answer,
  }).then(function (results) {
    res.end();
  });
});

router.get("/userQuestions", function (req, res) {
  var query = {};
  db.Questions.findAll({
    where: query,
  }).then(function (dbQuestions) {
    res.json(dbQuestions);
  });
});

router.get("/questions", checkAuthenticated, function (req, res) {
  res.render("questions", res);
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/api/trivia");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

module.exports = router;
