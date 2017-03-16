angular.module('chatApp.login.controller', []);


angular.module('chatApp.login.controller').controller('login-controller', ['$scope', '$http', '$rootScope', '$location', 'login_service',
    function($scope, $http, $rootScope, $location, login_service) {
<<<<<<< HEAD
=======

        $http.get('/chatroom').success(function(data) {
            console.log("chatroom list is:" + data);
            $rootScope.chatroomlist = data;
        })
>>>>>>> 81902e5e99bcf67924d99d0cea924f33e7648448
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

<<<<<<< HEAD
        $http.get('/chatroom').success(function(data) {
            console.log("chatroom list is:" + data);
            $rootScope.chatroomlist = data;
        })

=======
>>>>>>> 81902e5e99bcf67924d99d0cea924f33e7648448
        $scope.setChatroom = function() {
            $rootScope.chatroom = $scope.chat_room;
            console.log("chat room created" + $scope.chat_room);
            var chatRoom = {
                chatroom_name: $rootScope.chatroom,
                user: $rootScope.username
            };
            $http.post('/chatroom', chatRoom);
<<<<<<< HEAD
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
=======
            /*$http.get('/chatroom').success(function(data) {
                console.log("chatroom list is:" + data);
                $scope.chatroomlist = data;
            })*/
        }

        var inter = $interval(function() {
            if ($location.path().includes('/dashboard/')) {
                $http.get('/dashboard').success(function(data) {
                    $scope.logged_users = data;
                    console.log("called");
                    $interval.cancel(inter)
>>>>>>> 81902e5e99bcf67924d99d0cea924f33e7648448
                })
            } else {
                $interval.cancel(inter);
            }
        }, 1000);
    }
]);
