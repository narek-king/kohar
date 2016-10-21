'use strict';

console.log('concerts Ctrl 1 ');

angular.module('kohar.concerts', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/concerts', {
            templateUrl: 'app/views/concerts/concerts.html',
            controller: 'ConcertsCtrl'
        });
    }])

    .controller('ConcertsCtrl', ['$scope', function($scope) {

        $scope.options = {
            minDate: new Date(),
            showWeeks: true
        };
        $scope.popup1 = {
            opened: false
        };
        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };
    }]);