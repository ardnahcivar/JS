  angular.module('chatApp.login.services', []);
  angular.module('chatApp.login.services').service('login_service', ['$http', function($http) {
      this.toDatabase = function(name) {
          console.log("ins serevie" + name);
          var nameObj = {
              username: name
          };
          $http.post('/dashboard/', nameObj)
      }
  }]);


  angular.module('chatApp.login.services').factory('socket', ['$http', '$rootScope',
      function($rootScope, $http) {
          var socket = io();
          return {
              on: function(eventName, callback) {
                  socket.on(eventName, callback);
              },
              emit: function(eventName, data) {
                  socket.emit(eventName, data);
              }
          }
      }
  ])
