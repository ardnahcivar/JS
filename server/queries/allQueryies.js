var User = require('../models/user.js');
/*var getAllUsers = function() {
    User.find({}, {
            "username": 1,
            "_id": 0
        },
        function(err, data) {
            if (err) console.log("Error in data retrieval");
            return data;
        });
}

var setImage = function(username, image) {
    User.update({
        'username': username
    }, {
        $set: {
            user_img: image
        }
    }, {
        upsert: true
    }, function(err, data) {
        if (err) console.log("ERROR in image update");
        else {
            console.log("successfully updated image ");
        }
    })
}

var getId = function(username) {
    User.find({
        'username': username
    }, '_id', function(err, data) {
        if (err) console.log("ERROR in ID retreival");
        else {
            console.log("successfully retreived id of a user:" + data);
        }
    })
}
module.exports = getAllUsers;
module.exports = setImage;
module.exports = getId;
*/
module.exports = {
    getId: function(username, cb) {
        User.find({
            'username': username
        }, '_id', function(err, data) {
            if (err) console.log("ERROR in ID retreival");
            else {
                //console.log(data);
                cb(data)
            }
        })
    }
}
