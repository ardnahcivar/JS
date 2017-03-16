var db = require('../db_init.js')

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird')
var Schema = mongoose.Schema;
var userSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }
});
var User = db.model('User', userSchema);
module.exports = User;
