var app = require('express')();
var http = require('http').Server(app)
var io = require('socket.io')(http)
var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')

app.use(bodyParser.json())
app.use(express.static('../public'));
app.use(express.static('/models'));

app.use(bodyParser.urlencoded({
    extended: true
}));

var uploads = multer({
    dest: './uploads'
})

var User = require('./models/user.js');
var Chatroom = require('./models/chatroom.js');
var queries = require('./queries/allQueryies.js')


app.get('/', function(req, resp) {
    resp.sendFile('../public / index.html');
})

app.post('/dashboard/', function(req, resp) {
    var name = req.body.username;
    console.log(req.body.username);
    var user = new User({
        username: name
    });
    console.log("name is" + name);
    user.save(function(error) {
        if (error) {
            console.log('username already exists');
            resp.status(200);
        } else {
            console.log("username  created");
            resp.status(200);
        }
    })

})

app.get('/users', function(req, resp) {
    User.find({}, 'username', function(err, data) {
        if (err) console.log("ERROR in getting all Users");
        else {
            console.log("successfully got all users");
            resp.json(data);
        }
    }).select({
        '_id': 0
    })
})

app.get('/dashboard', function(req, resp) {
    User.find({}, {
            "username": 1,
            "_id": 0
        },
        function(err, data) {
            if (err) console.log("Error in data retrieva");
            else resp.json(data);
        });
})


app.get('/chatroom', function(req, resp) {
    Chatroom.find({}, 'chatroom_name', function(err, data) {
        if (err) console.log("error in retrieving chatroom data");
        else {
            //console.log("all data is:" + data);
            resp.json(data)
        };
    }).select({
        '_id': 0
    })
})

app.get('/chatroom/:chatroom_name', function(req, resp) {
    var roomname = req.params.chatroom_name;
    console.log("roomnameis:" + roomname);
    Chatroom.find({
        chatroom_name: roomname
    }, 'users', function(err, data) {
        if (err) console.log("error in retrieving specific chatroom data");
        else {
            console.log("uesssdsds" + data);
            resp.json(data)
        };
    }).select({
        '_id': 0
    })

})

app.post('/chatroom', function(req, resp) {
    var chatroom = new Chatroom();
    chatroom.chatroom_name = req.body.chatroom_name;
    console.log("array data:" + req.body.user);
    chatroom.users.push(req.body.user);
    chatroom.save(function(error, data) {
        if (error) {
            console.log("error in chatroom creation");
            Chatroom.update({
                chatroom_name: req.body.chatroom_name
            }, {
                $addToSet: {
                    users: req.body.user
                }
            }, {
                upsert: true
            }, function(err, data) {
                if (err) console.log("eRRRRRR");
                else {
                    console.log("SUCCCCCCCCCCCCCCCCcc")
                    resp.sendStatus(200);
                };
            });
        } else {
            console.log("chatroom created");
            resp.json(data);
        }
    })
})

app.get('/allMessages/:chatroom_name', function(req, resp) {
    var room = req.params.chatroom_name;
    //room = room.substring(0, room.length)
    console.log("chatroom_name in messages is:" + room);
    Chatroom.find({
        chatroom_name: room
    }, 'messages', function(err, data) {
        if (err) console.log("error in retrieving specific chatroom data");
        else {
            console.log("uesssdsds" + data);
            resp.json(data)
        };
    }).select({
        '_id': 0
    })
})

/*NOT WORKING
app.post('/changeprofile', uploads.single('username'), function(req, resp) {
    console.log("RECEIVED FILE ");
    console.log("FILE IS:" + req.username);
    //  setImage()
    resp.sendStatus(200);
})

app.post('/changeprofile', function(req, resp) {
    console.log("RECEIVED FILE ");
    console.log("FILE IS:" + );
    //  setImage()
    resp.sendStatus(200);
})
*/
io.on('connection', function(socket) {
    console.log("SOCKET GOT CONNECTED");

    socket.on('chatroom', function(data) {
        socket.user = data.user;
        //created a property on socket object
        queries.getId(socket.user, function(data) {
            socket.join(data[0]._id);
            console.log(socket.user + "joined:" + data[0]._id + "socket");
        });

        console.log("username on the socket is:" + socket.user);
        console.log("user is connected:" + data.user);

        socket.join(data.chatroom);
        console.log("chat room created:" + data.chatroom);
        socket.chatroom_name = data.chatroom;
    })

    socket.on('send', function(data) {
        console.log("message received:" + data.message);
        console.log("sending msg to room:" + data.chatroom);

        Chatroom.update({
            'chatroom_name': data.chatroom
        }, {
            $addToSet: {
                'messages': {
                    'message': data.message,
                    'user': data.user,
                    'time': new Date().toLocaleTimeString()
                }
            }
        }, {
            upsert: true
        }, function(err, data) {
            if (err) console.log("message storing operation failed");
            else {
                console.log("message storing success");

            }
        })

        socket.broadcast.to(data.chatroom).emit('recv', {
            message: data.message,
            user: data.user
        })
    })

    socket.on('isend', function(data) {
        console.log("got a message in INDIVIDUAL:" + data.message);
        queries.getId(data.user, function(idobj) {
            console.log("sending to:" + idobj[0]._id);

            socket.broadcast.to(idobj[0]._id).emit('irecv', {
                message: data.message,
                user: data.user
            })
        });
    })

    socket.on('disconnect', function() {
        console.log(socket.user + " is disconnected");
        /*User.find({
            username: socket.user
        }).remove().exec();
        Chatroom.find({
            chatroom_name: socket.chatroom_name
        }).remove().exec();
        */
    })
})


http.listen(8050, function() {
    console.log("server running at 8050 port");
})
