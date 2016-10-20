'use strict';

console.log('Music Ctrl 1 ');
angular.module('kohar.music', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/music', {
            templateUrl: 'views/music/music.html',
            controller: 'MusicCtrl'
        });
    }])

    .controller('MusicCtrl', [function() {
        console.log('Music Ctrl');
    }]);