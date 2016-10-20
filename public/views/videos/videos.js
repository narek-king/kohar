'use strict';

console.log('videos Ctrl 1 ');

angular.module('kohar.videos', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/videos', {
            templateUrl: 'views/videos/videos.html',
            controller: 'VideosCtrl'
        });
    }])

    .controller('VideosCtrl', [function() {
        console.log('Videos Ctrl');
    }]);