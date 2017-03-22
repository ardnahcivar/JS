angular.module('chatApp.core.services', []);

angular.module('chatApp.core.services').service('fileUpload', ['$rootScope', '$http', '$location',
    function($rootScope, $http, $location) {
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
])

angular.module('chatApp.core.services').service('getMessages', ['$rootScope', '$scope', '$http',
    function($rootScope, $scope, $http) {
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
])
