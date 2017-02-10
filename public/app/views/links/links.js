/**
 * Created by narek on 2/10/17.
 */
'use strict';

angular.module('kohar.links', [])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/links', {
            templateUrl: 'app/views/links/links.html',
            controller: 'LinkCtrl'
        });
    }])
    .controller('LinkCtrl', ['$scope', '$http', '$timeout', '$rootScope', 'uiGridValidateService', 'uiGridConstants', 'concertsServices',  '$uibModal', 'appConstants',
        function($scope, $http, $timeout, $rootScope, uiGridValidateService, uiGridConstants, concertsServices, $uibModal, appConstants) {

            $http.get(appConstants.url + '/api/links').success(function(links) {
                $scope.links = links;
                // console.log(links);
            }).error(function(error) {
                console.log(error);
            });

            $scope.submitForm = function (links) {
                var data = {text: links};
                $http.post(appConstants.url + '/links', data).success(function(response) {
                    location.reload();
                    // console.log(response);
                }).error(function(error) {
                    console.log(error);
                });
                // console.log(links);
            }



        }]);


