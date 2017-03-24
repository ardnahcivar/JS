angular.module('chatApp.core.services', []);

angular.module('chatApp.core.services').service('fileUpload', ['$http', '$location',
    function($http, $location) {
        this.uploadFileToUrl = function(file, url) {
            var fileData = new FormData();
            fileData.append('file', file);
            fileData.append('username', $rootScope.username)

            console.log(fileData);
            console.log("user name is:" + fileData.get('username'));

            $http.post(url, fileData, {
                    transformRequest: angular.identity,
                    headers: {
                        "Content-Type": undefined
                    }
                })
                .success(function() {
                    console.log("FILE uploaded successfully");
                    $location.path('/dashboard/:username');
                })
                .error(function() {
                    console.log("ERROR in uploading file");
                })
        }
    }
]);

angular.module('chatApp.core.services').service('getMessages', ['$http',
    function($http) {
        var fileData = new FormData();
        fileData.append('file', file);
        fileData.append('username', $rootScope.username)

        console.log(fileData);
        console.log("user name is:" + fileData.get('username'));

        $http.post(url, fileData, {
                transformRequest: angular.identity,
                headers: {
                    "Content-Type": undefined
                }
            })
            .success(function() {
                console.log("FILE uploaded successfully");
                $location.path('/dashboard/:username');
            })
            .error(function() {
                console.log("ERROR in uploading file");
            })
    }
]);

angular.module('chatApp.core.services').factory('getAllData', ['$http',
    function($http) {
        return {
            getAllChatgroups: function(cb) {
                $http.get('/chatroom').success(function(data) {
                        cb(data);
                    })
                    .error(function(err) {
                        console.log("ERROR in getting all chatrooms");
                    })
            },
            getAllUsers: function(cb) {
                $http.get('/users').success(function(data) {
                        cb(data);
                    })
                    .error(function(err) {
                        console.log("ERROR in getting all users");
                    });
            },
            getIAllMessages: function(username, cb) {
                $http.get('/individual/:username').success(function(data) {
                        cb(data)
                    })
                    .error(function(err) {
                        console.log("ERROR in getting INDIVIDUAL messsages");
                    })
            }
        }
    }
]);
