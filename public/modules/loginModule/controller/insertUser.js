angular.module('chatApp.login.controller', []);


angular.module('chatApp.login.controller').controller('login-controller', ['$scope', '$http', '$rootScope', '$location', '$state', 'login_service',
    function($scope, $http, $rootScope, $location, $state, login_service) {
        $scope.submitForm = function() {
            if ($scope.username) {
                $rootScope.chatWith = "";
                $rootScope.username = $scope.username;
                console.log("username is" + $scope.username);
                login_service.toDatabase($scope.username);
            }
            $location.path('/dashboard/' + $scope.username)
            //$state.go('dashboard')
        }
    }
]);


angular.module('chatApp.login.controller').controller('loggedinUsers-controller', ['$scope', '$rootScope', '$http', '$interval', '$location', '$state', 'getAllData',
    function($scope, $rootScope, $http, $interval, $location, $state, getAllData) {
        $scope.$state = $state;
        $scope.me = "rarar"

        getAllData.getAllChatgroups(function(data) {
            $rootScope.chatgroups = data;
            console.log("ALLLLLLLLLLLLLLLLLL");
            console.log(data.chatroom_name);
        })

        $scope.setChatroom = function() {
            $rootScope.chatroom = $scope.chat_room;
            console.log("chat room created" + $scope.chat_room);
            var chatRoom = {
                chatroom_name: $rootScope.chatroom,
                user: $rootScope.username
            };
            $http.post('/chatroom', chatRoom);
            getAllData.getAllChatgroups(function(data) {
                $rootScope.chatgroups = data;
                console.log("ALLLLLLLLLLLLLLLLLL");
                console.log(data.chatroom_name);
            })
        }
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
