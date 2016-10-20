'use strict';

console.log('concerts Ctrl 1 ');

angular.module('kohar.concerts', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/concerts', {
            templateUrl: 'views/concerts/concerts.html',
            controller: 'ConcertsCtrl'
        });
    }])

    .controller('ConcertsCtrl', [function() {
        console.log('Concerts Ctrl');
    }]);