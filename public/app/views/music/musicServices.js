console.log("services ");

angular.module('kohar.services', [])
    .factory('connectWithDb', ['$http', function($http) {
    return {
        insertRow : function (data) {
            $http.post("http://localhost:8000//music-album", data).then(function(data, status) {
                console.log('data ', data);
                console.log('status ', status);
            });
        },
        getAll: function() {
            return $http({
                method: 'GET',
                url: 'http://kohar.horizondvp.org/api/music-album'
            });
        },
        updateRow : function (id) {
            $http({
                method: 'PUT',
                url: 'http://localhost:8000//music-album:' + id
            });
        },
        deleteRow : function (id, data) {
            $http({
                method: 'DELETE',
                url: 'http://kohar.horizondvp.org/api/music-album/' + id
            });
        }

    };
}]);

