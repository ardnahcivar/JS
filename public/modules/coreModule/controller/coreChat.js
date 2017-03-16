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
        $scope.messages = [];
        $scope.recvmessages = [];
        $scope.senduserobj = [];
        $scope.recvuserobj = [];

        socket.on('connect', function() {
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
            $scope.messages.push($scope.message)
            $scope.senduserobj.push({
                user: $rootScope.username,
                message: $scope.message,
                time: new Date().toLocaleTimeString()
            })
<<<<<<< HEAD
            $scope.message = "";

        }
        socket.on('recv', function(data) {
            $scope.recvmessages.push(data.message);
            console.log("message from client:" + data.user);
            console.log("message received on client" + data.message);
            $scope.recvuserobj.push({
                user: data.user,
                message: data.message,
                time: new Date().toLocaleTimeString()
            });
            $http.get('/chatroom/' + $scope.chatWith).success(function(data) {
                console.log("mmmmmmmmmmmmmmmmmm" + data);
                $scope.online = data;
            })
            $scope.$digest();
        })
    }
]);


angular.module('chatApp.core.controller').directive('sendMsg', [function($compile) {
    return {
        restrict: 'E',
        scope: {
            message: '=message'

        },
        templateUrl: 'modules/coreModule/views/send.html',
        /*
        link: function(scope, element, attrs) {
            //  var elem = '<div class="chat"><ul><li clas="you"><a class="user" href="#"><img src="https://s3.amazonaws.com/uifaces/faces/twitter/igorgarybaldi/128.jpg" alt="yours image"></a><div class="date">12 minutes ago</div><div class="message"><div class="hider"><span>click to read</span></div><p>$scope.message</p></div></li></ul></div>'
            //    console.dir(elem.html ());
        //element.append(elem)
    }*/
    }
}]);

angular.module('chatApp.core.controller').directive('recvMsg', [function($compile) {
    return {
        restrict: 'E',
        scope: {
            message: '=message'
        },
        templateUrl: 'modules/coreModule/views/recv.html',
        link: function(scope, element, attrs) {

            //  var elem = '<div class="chat"><ul><li clas="you"><a class="user" href="#"><img src="https://s3.amazonaws.com/uifaces/faces/twitter/igorgarybaldi/128.jpg" alt="yours image"></a><div class="date">12 minutes ago</div><div class="message"><div class="hider"><span>click to read</span></div><p>$scope.message</p></div></li></ul></div>'
            //    console.dir(elem.html ());*/
            //element.append(elem)
        }
    }
=======
        }
        socket.on('recv', function(data) {
            $scope.recvmessages.push(data.message);
            console.log("message from client:" + data.user);
            console.log("message received on client" + data.message);
            $scope.recvuserobj.push({
                user: data.user,
                message: data.message,
                time: new Date().toLocaleTimeString()
            });
            $scope.$digest();
        })
    }
]);


angular.module('chatApp.core.controller').directive('sendMsg', [function($compile) {
    return {
        restrict: 'E',
        scope: {
            message: '=message'

        },
        templateUrl: 'modules/coreModule/views/send.html',
        link: function(scope, element, attrs) {
            //  var elem = '<div class="chat"><ul><li clas="you"><a class="user" href="#"><img src="https://s3.amazonaws.com/uifaces/faces/twitter/igorgarybaldi/128.jpg" alt="yours image"></a><div class="date">12 minutes ago</div><div class="message"><div class="hider"><span>click to read</span></div><p>$scope.message</p></div></li></ul></div>'
            //    console.dir(elem.html ());*/
            //element.append(elem)
        }
    }
}]);

angular.module('chatApp.core.controller').directive('recvMsg', [function($compile) {
    return {
        restrict: 'E',
        scope: {
            message: '=message'
        },
        templateUrl: 'modules/coreModule/views/recv.html',
        link: function(scope, element, attrs) {

            //  var elem = '<div class="chat"><ul><li clas="you"><a class="user" href="#"><img src="https://s3.amazonaws.com/uifaces/faces/twitter/igorgarybaldi/128.jpg" alt="yours image"></a><div class="date">12 minutes ago</div><div class="message"><div class="hider"><span>click to read</span></div><p>$scope.message</p></div></li></ul></div>'
            //    console.dir(elem.html ());*/
            //element.append(elem)
        }
    }
>>>>>>> 81902e5e99bcf67924d99d0cea924f33e7648448
}]);
