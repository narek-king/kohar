'use strict';

console.log('Photo Ctrl 1 ');
angular.module('kohar.photo', ['ngRoute', 'ui.bootstrap'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/photo', {
            templateUrl: 'app/views/photo/photo.html',
            controller: 'PhotoCtrl'
        });
    }])

    .controller('PhotoCtrl', [function() {
        console.log('Photo Ctrl');
    }]);