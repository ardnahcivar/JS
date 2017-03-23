angular.module('chatApp', ['ngRoute', 'chatApp.login.controller', 'chatApp.login.services',
        'chatApp.core.controller', 'chatApp.core.directives', 'chatApp.core.services'
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
        .when('/changeprofile', {
            templateUrl: '/modules/coreModule/views/changeprofile.html',
            controller: 'changeprofile-controller'
        })
        .when('/oneTo/:second_user', {
            templateUrl: '/modules/coreModule/views/singlechat.html',
            controller: 'singlechat-controller'
        })
        .otherwise({
            redirectTo: '/home'
        });
    $locationProvider.html5Mode(true);
}])
