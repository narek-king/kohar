'use strict';

console.log('Photo Ctrl 1 ');
angular.module('kohar.photo', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/photo', {
            templateUrl: 'views/photo/photo.html',
            controller: 'PhotoCtrl'
        });
    }])

    .controller('PhotoCtrl', [function() {
        console.log('Photo Ctrl');
    }]);