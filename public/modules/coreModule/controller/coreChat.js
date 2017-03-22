angular.module('chatApp.core.controller', []);

angular.module('chatApp.core.controller').controller('chat-controller', ['$scope', '$http', '$rootScope', '$location', '$routeParams', 'socket',

    function($scope, $http, $rootScope, $location, $routeParams, socket) {
        $scope.user = $rootScope.username;
        $scope.chatWith = $routeParams.username;
        console.log("chatwith" + $scope.chatWith);
        $http.get('/chatroom/' + $scope.chatWith).success(function(data) {
            console.log("mmmmmmmmmmmmmmmmmm" + data);
            $scope.online = data;
        })
        /*    $scope.messages = [];*/
        $scope.recvmessages = [];
        $scope.senduserobj = [];
        $scope.recvuserobj = [];

        socket.on('connect', function() {
            $http.get('/allMessages/' + $scope.chatWith).success(function(data) {
                console.log(data);

            })
            socket.emit('chatroom', {
                chatroom: $rootScope.chatroom,
                user: $rootScope.username
            })
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
            console.log($scope.senduserobj[0].message);
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
