if (process.env.NODE_ENV !== "production") {
    require("dotenv").config
}

const express = require("express");
const app = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

const initializePassport = require("../passport.config");
initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

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
    res.render("index", { name: req.user.name })
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
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPass
        })
        res.redirect("/login")
    } catch {
        res.redirect("/register")
    }
   console.log(users);
   
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
