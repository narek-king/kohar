console.log("services ");

angular.module('kohar.services', [])
    .factory('connectWithDb', ['$http', function($http) {
    return {
        getAll: function() {
            return $http({
                method: 'GET',
                url: 'http://kohar.horizondvp.org/api/music-album'
            });

        }
    };
}]);

