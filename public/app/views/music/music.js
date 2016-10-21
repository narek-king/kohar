'use strict';

console.log('Music Ctrl 1 ');
angular.module('kohar.music', ['ngRoute', 'ui.bootstrap'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/music', {
            templateUrl: 'app/views/music/music.html',
            controller: 'MusicCtrl'
        });
    }])

    .controller('MusicCtrl', [function() {
        console.log('Music Ctrl');
    }]);