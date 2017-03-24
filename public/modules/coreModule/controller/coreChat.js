angular.module('chatApp.core.controller', []);


angular.module('chatApp.core.controller').controller('chat-controller', ['$scope', '$http', '$rootScope', '$location', '$routeParams', 'socket', 'getAllData',

    function($scope, $http, $rootScope, $location, $routeParams, socket, getAllData) {
        $scope.user = $rootScope.username;
        $scope.chatWith = $routeParams.username;
        console.log("chatwith" + $scope.chatWith);
        $http.get('/chatroom/' + $scope.chatWith).success(function(data) {
            console.log("mmmmmmmmmmmmmmmmmm" + data);
            $scope.online = data;
        })

        getAllData.getAllChatgroups(function(data) {
            $scope.chatgroups = data;
            console.log("ALLLLLLLLLLLLLLLLLL");
            console.log(data.chatroom_name);

        })

        /*    $scope.messages = [];*/
        $scope.recvmessages = [];
        $scope.senduserobj = [];
        $scope.recvuserobj = [];

        socket.on('connect', function() {
            console.log("got connected to socket  io");
            socket.emit('chatroom', {
                chatroom: $rootScope.chatroom,
                user: $rootScope.username
            })

            /*  $http.get('/allMessages/' + $scope.chatWith).success(function(data) {
                  console.log(data[0].messages);
                  $scope.senduserobj = data[0].messages;
              })*/

        })

        $scope.sendMsg = function() {

            socket.emit('send', {
                message: $scope.message,
                chatroom: $rootScope.chatroom,
                user: $scope.user
            })
            console.log("message send");
            //  $scope.messages.push($scope.message)
            $scope.senduserobj.push({
                user: $rootScope.username,
                message: $scope.message,
                time: new Date().toLocaleTimeString()
            })
            console.log("send usre object is");
            console.log($scope.senduserobj);
            $scope.message = "";
        }

        socket.on('recv', function(data) {
            //  $scope.recvmessages.push(data.message);
            console.log("message from client:" + data.user);
            console.log("message received on client" + data.message);

            /*
            $scope.recvuserobj.push({
                user: data.user,
                message: data.message,
                time: new Date().toLocaleTimeString()
            });
            */
            $scope.senduserobj.push({
                user: data.user,
                message: data.message,
                time: new Date().toLocaleTimeString()
            })

            $http.get('/chatroom/' + $scope.chatWith).success(function(data) {
                console.log("mmmmmmmmmmmmmmmmmm" + data);
                $scope.online = data;
            })
            $scope.$digest();
        })
    }
]);


angular.module('chatApp.core.controller').controller('changeprofile-controller', ['$scope', '$http', '$location', 'fileUpload',
    function($scope, $location, $http, fileUpload) {
        $scope.uploadFile = function() {
            var file = $scope.myFile;
            var url = "/changeprofile";
            //  console.log(fileUpload.uploadFileToUrl(file, url));
            fileUpload.uploadFileToUrl(file, url)
        }
    }
]);


angular.module('chatApp.core.controller').controller('singlechat-controller', ['$scope', '$rootScope', '$http', '$location', '$routeParams', 'socket',

    function($scope, $rootScope, $location, $http, $routeParams, socket) {
        $scope.user = $rootScope.username;
        $scope.second_user = $routeParams.second_user;
        console.log("SECOND USER IS :" + $scope.second_user);
        $scope.isendmessageobj = []

        $scope.isendMsg = function() {
            socket.emit('isend', {
                message: $scope.message,
                user: $scope.second_user

            })
            $scope.isendmessageobj.push({
                user: $scope.user,
                message: $scope.message,
                time: new Date().toLocaleTimeString(),
            })
        }
        socket.on('irecv', function(data) {
            console.log("RECEIVED MESSAGE:" + data.message);
            $scope.isendmessageobj.push({
                user: data.user,
                message: data.message,
                time: new Date().toLocaleTimeString(),
            })
            $scope.$digest();
        })
    }
])
