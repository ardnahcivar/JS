var mongoose = require('mongoose');
mongoose.Promise = require('bluebird')
var mongodb_url = "mongodb://root:root@ds117830.mlab.com:17830/chatter-box";
var options = {
    server: {
        socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS: 30000
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS: 30000
        }
    }
};
mongoose.connect(mongodb_url, options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.on('open', function() {
    console.log('database is connected');

})

module.exports = db;
