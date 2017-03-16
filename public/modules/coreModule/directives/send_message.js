<<<<<<< HEAD
/*
=======
>>>>>>> 81902e5e99bcf67924d99d0cea924f33e7648448
angular.module('chatApp.core.controller', []);
angular.module('chatApp.core.controller', []).directive('send', [function($templateRequest, $compile) {
    return {
        compile: function(tElem, attrs) {
            console.log("ndienfienf");
        }

<<<<<<< HEAD
          restrict: 'E',
=======
        /*  restrict: 'E',
>>>>>>> 81902e5e99bcf67924d99d0cea924f33e7648448
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
<<<<<<< HEAD
          }
    }
}]);

*/
=======
          }*/
    }
}]);
>>>>>>> 81902e5e99bcf67924d99d0cea924f33e7648448
