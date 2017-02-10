'use strict';

angular.module('kohar.about', [])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/about', {
            templateUrl: 'app/views/about/about.html',
            controller: 'AboutCtrl'
        });
    }])
    .controller('AboutCtrl', ['$scope', '$http', '$timeout', '$rootScope', 'uiGridValidateService', 'uiGridConstants', 'concertsServices',  '$uibModal', 'appConstants', 'Upload',
        function($scope, $http, $timeout, $rootScope, uiGridValidateService, uiGridConstants, concertsServices, $uibModal, appConstants, Upload) {

            $http.get(appConstants.url + '/api/about').success(function(text) {
                $scope.text = text.text;
                // console.log(text.text);
            }).error(function(error) {
                console.log(error);
            });

            $scope.submitForm = function (text) {
                var data = {text: text};
                $http.post(appConstants.url + '/about', data).success(function(response) {
                    location.reload();
                    console.log(response);
                }).error(function(error) {
                    console.log(error);
                });
                console.log(text);
            }

            $scope.uploadPic = function(file) {
                if(file)
                file.upload = Upload.upload({
                    url: appConstants.url + '/about',
                    data: {file: file},
                });

                if (file)
                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                        console.log(response);
                        if (response.statusText == 'OK')
                            location.reload();
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            }

        }]);


