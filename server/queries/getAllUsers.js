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

var setImage = function(username, image) {
    User.update({
        'username': username
    }, {
        $set: {
            user_img: image
        }
    }, {
        upsert: true;
    }, function(err, data) {
        if (err) console.log("ERROR in image update");
        else {
            console.log("successfully updated image ");
        }
    })
}
module.exports = getAllUsers;
module.exports = setImage;
