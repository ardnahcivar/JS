angular.module('chatApp', ['ui.router', 'chatApp.login.controller', 'chatApp.login.services',
        'chatApp.core.controller', 'chatApp.core.services', 'chatApp.core.directives'
    ])
    .run(function($rootScope, $state, $stateParams) {
        console.log("loaded with dependency");
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    });


angular.module('chatApp').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider.state('home', {
                url: '/home',
                controller: 'login-controller',
                templateUrl: '/modules/loginModule/views/home.html'
            })
            /*
                .when('/dashboard/:username', {
                    templateUrl: '/modules/loginModule/views/dashboard.html',
                    controller: 'loggedinUsers-controller'
                })
                .when('/chatWith/:username', {
                    templateUrl: '/modules/coreModule/views/chat.html',
                    controller: 'chat-controller'
                })*/

            .state('dashboard', {
                url: '/dashboard/:username',
                templateUrl: '/modules/coreModule/views/chat.html',
                controller: 'chat-controller'
            })
            .state('dashboard.list', {
                url: 'list',
                views: {
                    "mainview.list": {
                        templateUrl: '/modules/coreModule/views/create_chatroom.html',
                        controller: 'loggedinUsers-controller'
                    }
                }
            })
            .state('dashboard.header-details', {
                url: 'header',
                views: {
                    "mainview.header-details": {
                        templateUrl: '/modules/coreModule/views/user_details.html',
                        controller: function($rootScope, $scope, $state, $stateParams, socket) {
                            $scope.data = $stateParams.username || $stateParams.chatgroup;
                            console.log("JUST CHECK");
                            console.log($stateParams);
                            $rootScope.chatWith = $stateParams.username || $stateParams.chatgroup;
                            socket.emit('init-chatgroup', {
                                chatgroup: $rootScope.chatWith.replace(/:chatgroup/g, '')
                            })
                        }
                    }
                }
            })
            .state('changeprofile', {
                url: '/changeprofile',
                templateUrl: '/modules/coreModule/views/changeprofile.html',
                controller: 'changeprofile-controller'
            })

            .state('oneTosecond', {
                url: '/oneTo:second_user',
                templateUrl: '/modules/coreModule/views/singlechat.html',
                controller: 'singlechat-controller'
            });
        $urlRouterProvider.otherwise('/home');
        $locationProvider.html5Mode(true);
    }
])
