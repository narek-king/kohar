'use strict';

// Declare app level module which depends on views, and components

angular.module('kohar', [
  'ngRoute',
  'ngAnimate',
  'ngTouch',
  'ngFileUpload',
  'kohar.services',
  'kohar.photo-album',
  'kohar.photo',
  'kohar.photoDir',
  //'kohar.timeConverter',
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
  'kohar.music-albums',
  'kohar.music',
  'kohar.video',
  'kohar.concerts',
   'kohar.about',
  'ui.bootstrap.datepickerPopup'

]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/music-albums'});
}]).controller('MainCtrl', function($scope, myConfig){
    $scope.activeMenu = 'music-albums';

  console.log('MainCtrl');

  console.log(myConfig);
});
