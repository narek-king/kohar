'use strict';

console.log('Music Ctrl 1 ');
angular.module('kohar.music', ['ngRoute', 'ui.bootstrap'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/music', {
            templateUrl: 'app/views/music/music.html',
            controller: 'MusicCtrl'
        });
    }])

    .controller('MusicCtrl', ['$http', function($http) {
        console.log('Music Ctrl');

        $http({
            method: 'GET',
            url: 'http://kohar.horizondvp.org/api/music'
        }).then(function successCallback(response) {

            console.log('response');
            console.log(response);
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            console.log('error');
            console.log(response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }]);