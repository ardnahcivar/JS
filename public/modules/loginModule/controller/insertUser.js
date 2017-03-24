angular.module('chatApp.login.controller', []);


angular.module('chatApp.login.controller').controller('login-controller', ['$scope', '$http', '$rootScope', '$location', 'login_service',
    function($scope, $http, $rootScope, $location, login_service) {
        $scope.submitForm = function() {
            if ($scope.username) {
                $rootScope.username = $scope.username;
                console.log("username is" + $scope.username);
                login_service.toDatabase($scope.username);
            }
            $location.path('/dashboard/' + $scope.username)
        }
    }
]);


angular.module('chatApp.login.controller').controller('loggedinUsers-controller', ['$scope', '$rootScope', '$http', '$interval', '$location',
    function($scope, $rootScope, $http, $interval, $location) {
        $http.get('/chatroom').success(function(data) {
            console.log("chatroom list is:" + data);
            $rootScope.chatroomlist = data;
        })

        $scope.setChatroom = function() {
            $rootScope.chatroom = $scope.chat_room;
            console.log("chat room created" + $scope.chat_room);
            var chatRoom = {
                chatroom_name: $rootScope.chatroom,
                user: $rootScope.username
            };
            $http.post('/chatroom', chatRoom);
            $http.get('/chatroom').success(function(data) {
                console.log("chatroom list is:" + data);
                $rootScope.chatroomlist = data;
            })
        }


        /*$rootScope.$watch(function() {
            return $rootScope.chatroomlist;
        }, function() {
            console.log($rootScope.chatroomlist);
            console.log("rootScope variable got changed")
            $http.get('/chatroom').success(function(data) {
                console.log("chatroom list is:" + data);
                $rootScope.chatroomlist = data;
            });
        });
        */
        var inter = $interval(function() {
            if ($location.path().includes('/dashboard')) {
                $http.get('/chatroom').success(function(data) {
                    console.log("just updating the view");
                    $rootScope.chatroomlist = data;
                })
            } else {
                $interval.cancel(inter);
            }
        }, 1000);
    }
]);
