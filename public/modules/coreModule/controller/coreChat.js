angular.module('chatApp.core.controller', []);


angular.module('chatApp.core.controller').controller('chat-controller', ['$scope', '$http', '$rootScope', '$location', '$stateParams', 'socket', 'getAllData',

    function($scope, $http, $rootScope, $location, $stateParams, socket, getAllData) {
        $scope.user = $rootScope.username;
        //$scope.chatWith = $stateParams.username;
        console.log("chatwith" + $rootScope.chatWith);

        getAllData.getAllUsers(function(data) {
            $rootScope.users = data;
            console.log($rootScope.users);
        })

        getAllData.getAllChatgroups(function(data) {
            $rootScope.chatgroups = data;
            console.log("ALLLLLLLLLLLLLLLLLL");
            console.log(data.chatroom_name);
        })

        console.log("chatwith AGAIN" + $rootScope.chatWith);
        /*    $scope.messages = [];*/
        $scope.recvmessages = [];
        $scope.senduserobj = [];
        $scope.recvuserobj = [];
        $scope.isendmessageobj = [];

        socket.on('connect', function() {
            console.log("got connected to socket io");
            socket.emit('chatroom', {
                chatroom: $rootScope.chatroom,
                user: $rootScope.username
            })
        })

        $scope.sendMsg = function() {
            console.log("CALLED SEND BTN");
            console.log("chatwithIN SEND" + $rootScope.chatWith);
            if ($rootScope.chatWith.includes(':chatgroup')) {
                console.log("IN chatgroup");

                socket.emit('send', {
                    message: $scope.message,
                    to: $rootScope.chatWith.replace(/:chatgroup/g, ''),
                    from: $scope.user
                })
                console.log("message send");
                //  $scope.messages.push($scope.message)
                /*$scope.senduserobj.push({
                    user: $rootScope.username,
                    message: $scope.message,
                    time: new Date().toLocaleTimeString()
                })*/
                $scope.isendmessageobj.push({
                    user: $scope.user,
                    message: $scope.message,
                    time: new Date().toLocaleTimeString(),
                    align: 'left'
                })
                console.log("send usre object is");
                console.log($scope.isendmessageobj);
                $scope.message = "";

            } else {
                socket.emit('isend', {
                    message: $scope.message,
                    to: $rootScope.chatWith,
                    from: $rootScope.username
                })
                console.log("message send:");

                $scope.isendmessageobj.push({
                    user: $scope.user,
                    message: $scope.message,
                    time: new Date().toLocaleTimeString(),
                    align: 'left'
                })
                console.log("isendmessageobj is");
                console.log($scope.isendmessageobj);
                $scope.message = "";
            }
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
            $scope.isendmessageobj.push({
                user: data.user,
                message: data.message,
                time: new Date().toLocaleTimeString(),
                align: 'right'
            })
            console.log($scope.isendmessageobj);
            $scope.$digest()
        })

        socket.on('irecv', function(data) {
            console.log("RECEIVED MESSAGE:" + data.message);
            $scope.isendmessageobj.push({
                user: data.user,
                message: data.message,
                time: new Date().toLocaleTimeString(),
                align: 'right'
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
