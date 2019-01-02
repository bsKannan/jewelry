var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var config = require('../config/database');

var schema = mongoose.schema;

var UserSchema = mongoose.Schema({
    name : {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id,callback){
    User.findById(id,callback);
}

module.exports.getUserByUsername = function(username,callback) {
    var query = {username:username}
    User.findOne(query,callback);
}

module.exports.addUser = function(newUser,callback) {
    bcrypt.genSalt(10,(err,salt)=> {
        bcrypt.hash(newUser.password, err , (err,hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })
    })
}

module.exports.comparePassword = function(candidatePassword, hash,callback) {
    bcrypt.compare(candidatePassword,hash,(err,isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}