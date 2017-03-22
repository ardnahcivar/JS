angular.module('chatApp.core.directives', [])

angular.module('chatApp.core.directives').directive('sendMsg', [function($compile) {
    return {
        restrict: 'E',
        scope: {
            message: '=message'
        },
        templateUrl: 'modules/coreModule/views/send.html',

    }
}]);

angular.module('chatApp.core.directives').directive('recvMsg', [function($compile) {
    return {
        restrict: 'E',
        scope: {
            message: '=message'
        },
        templateUrl: 'modules/coreModule/views/recv.html',

    }
}]);

angular.module('chatApp.core.directives').directive('userHeader', [function() {
    return {
        restrict: 'E',
        scope: {
            user: '=user'
        },
        templateUrl: 'modules/coreModule/views/user_header.html'
    }
}])


angular.module('chatApp.core.directives').directive('fileModel', ['$parse', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0])
                })
            })
        }
    }
}])
