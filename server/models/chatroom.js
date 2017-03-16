var db = require('../db_init.js')

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird')
var Schema = mongoose.Schema;
var chatroomSchema = Schema({
    chatroom_name: {
        type: String,
        required: true,
        unique: true
    },
    users:[]
});
var Chatroom = db.model('Chatroom', chatroomSchema);
module.exports = Chatroom;
