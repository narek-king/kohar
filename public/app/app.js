'use strict';

// Declare app level module which depends on views, and components
angular.module('kohar', [
  'ngRoute',
  'ngAnimate',
  'ngTouch',
  'kohar.services',
  'kohar.version',
  'ui.bootstrap',
  'ui.grid',
  'kohar.view1',
  'kohar.view2',
  'kohar.music-albums',
  'kohar.music',
  'kohar.videos',
  'kohar.photo',
  'kohar.concerts',
  'kohar.news',
  'ui.bootstrap.datepickerPopup'

]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/music-albums'});
}]);
