angular.module('chatApp.core.controller', []);
angular.module('chatApp.core.controller', []).directive('send', [function($templateRequest, $compile) {
    return {
        compile: function(tElem, attrs) {
            console.log("ndienfienf");
        }

        /*  restrict: 'E',
          scope: {
              message: '=message'
          },
          link: function(scope, elem, attrs) {
              console.log("inside directive");
          }
          controller: function($scope, $attrs, $element) {
              $templateRequest('send.html').then(function(html) {
                  $element.append($compile(html)(scope));
              })
          }*/
    }
}]);
