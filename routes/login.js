if (process.env.NODE_ENV !== "production") {
    require("dotenv").config
}

const express = require("express");
const app = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

let UserTransactions = require("../transactions/user")

const initializePassport = require("../passport.config");
initializePassport(passport)



const users = [{
    id: '1589788228121',
    name: 'polly',
    email: 'p@gmail.com',
    password: '$2b$10$mX.vZYKWY0xDWYF/mC5S2eeGwd4RVMTSX.3FVmnd/7GbKJPrGlMRG'
  }]

app.use(flash())
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride("_method"))

app.get('/', checkAuthenticated, (req,res) => {
    console.log(req.user);
    res.render("index", { name: req.user.name, email: req.user.email})
});

app.get('/login', checkNotAuthenticated, (req,res) => {
    res.render("login", { login: "hello"})
});

app.post('/login', checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req,res) => {
    res.render("register", { register: "hello"})
});

app.post('/register', checkNotAuthenticated,  async (req,res) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10)

        UserTransactions.createUser(req.body.name, req.body.email, hashedPass, function(newUser) {
            console.log("good to go")
        })
        res.redirect("/login")
    } catch {
        res.redirect("/register")
    }

   
})

app.delete("/logout", (req,res) => {
    req.logOut(),
    res.redirect("/login")
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login")
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return  res.redirect("/")
    }
    next()
}

module.exports = app;
