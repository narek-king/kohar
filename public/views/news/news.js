'use strict';

console.log('News Ctrl 1 ');
angular.module('kohar.news', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/news', {
            templateUrl: 'views/news/news.html',
            controller: 'NewsCtrl'
        });
    }])

    .controller('NewsCtrl', [function() {
        console.log('News Ctrl');
    }]);