let db = require('../models')


let userTransactions = {

    createUser : function (name, email, password, cb){

        db.User.create({
            email : email,
            name : name, 
            password : password
        }).then( newUser => {
            console.log("new user created, ", newUser)
            cb(newUser)
        }, error => {
            console.log("error creating new user", error)
            cb(null, error)
        })

    }, 

    updateUser : function(){

    },

    findUser : function(id, cb){
        db.User.findOne({
            id : id
        }).then( foundUser => {
            cb(foundUser)
        }, err => {
            cb(null, err)
        })
    }, 

    findUserByEmail : function(email, cb){
        db.User.findOne({
            where : { email : email }
        }).then( foundUser => {
            console.log("user to be logged in ", foundUser)
            cb(foundUser)
        }, err => {
            console.log("error is", err)
            cb(null, err)
        })
    },

    deleteUser : function(id, name, email){

    }

}

module.exports = userTransactions