var User = require('../models/user.js');
var getAllUsers = function() {
    User.find({}, {
            "username": 1,
            "_id": 0
        },
        function(err, data) {
            if (err) console.log("Error in data retrieval");
            return data;
        });
}
module.exports = getAllUsers;
