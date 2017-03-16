angular.module('chatApp', ['ngRoute', 'chatApp.login.controller', 'chatApp.login.services',
        'chatApp.core.controller'
    ])
    .run(function() {
        console.log("loaded with dependency");
    });


angular.module('chatApp').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/home', {
            templateUrl: '/modules/loginModule/views/home.html',
            controller: 'login-controller'
        })
        .when('/dashboard/:username', {
            templateUrl: '/modules/loginModule/views/dashboard.html',
            controller: 'loggedinUsers-controller'
        })
        .when('/chatWith/:username', {
            templateUrl: '/modules/coreModule/views/chat.html',
            controller: 'chat-controller'
        })
        .otherwise({
            redirectTo: '/home'
        });
    $locationProvider.html5Mode(true);
}])
