const router = require("express").Router();

// GET "/api/trivia" responds with all notes from the database
router.get("/trivia", checkAuthenticated, function(req, res) {
   res.render("index", res)
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

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/api/trivia")
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return  res.redirect("/")
    }
    next()
}

module.exports = router;
