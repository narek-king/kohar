'use strict';

// Declare app level module which depends on views, and components

angular.module('kohar', [
  'ngRoute',
  'ngAnimate',
  'ngTouch',
  'ngFileUpload',
  'kohar.services',
  'kohar.photo',
  'kohar.previewImage',
  'kohar.version',
  'kohar.version',
  'ui.bootstrap',
  'ui.grid',
  'ui.grid.pagination',
  'ui.grid.edit',
  'ui.grid.resizeColumns',
  'ui.grid.validate',
  'ui.grid.selection',
  'kohar.view1',
  'kohar.view2',
  'kohar.music-albums',
  'kohar.music',
  'kohar.videos',
  'kohar.concerts',
  'ui.bootstrap.datepickerPopup'

]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/music-albums'});
}]);
