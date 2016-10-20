'use strict';

// Declare app level module which depends on views, and components
angular.module('kohar', [
  'ngRoute',
  'kohar.view1',
  'kohar.view2',
  'kohar.music',
  'kohar.videos',
  'kohar.photo',
  'kohar.concerts',
  'kohar.news',
  'kohar.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/music'});
}]);
