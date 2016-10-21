'use strict';

console.log('News Ctrl 1 ');
angular.module('kohar.news', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/news', {
            templateUrl: 'app/views/news/news.html',
            controller: 'NewsCtrl'
        });
    }])

    .controller('NewsCtrl', ['$scope', function($scope) {

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