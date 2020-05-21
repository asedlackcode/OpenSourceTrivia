const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcryptjs");
let UserTransactions = require("./transactions/user")




function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email)
        if (user == null) {
            return done(null, false, { message: "No user found with this email" })
        } 

        try {
            if(await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: "Password Incorrect" })
            }
        } catch(e) {
            return done(e)
        }
    }
    passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}



function init(passport) {


    passport.serializeUser(function(user, done){
        console.log('serialize user..', user)
        done( null, user.email)
    })


    passport.deserializeUser(function(email, done){
        UserTransactions.findUserByEmail(email, function(user, err){
            done(err, user)
        })
    })


    passport.use(new LocalStrategy({
        usernameField : 'email',
        passwordField : "password",
        passReqToCallback : true
    },  function(req, email, password, done){
        console.log("we have access...", req.body.email, req.body.password)
        UserTransactions.findUserByEmail(email, async function(user){
            // if no user, user does not exist
            if(!user){
                done(null, false, req.flash("Email and Password combination not recongized"))
            }

            if(user){
                let passwordCompare = await bcrypt.compare(req.body.password, user.password)
                if(passwordCompare) {
                    console.log('user is logged in now', user)
                    done(null, user)
                } else {
                    done(null, false, req.flash("Email and Password combination not recongized"))
                }
            }
        })

    }))
}

module.exports = init;