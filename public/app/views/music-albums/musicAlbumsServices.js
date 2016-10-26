console.log("musicAlbumsServices ");

angular.module('kohar.services', [])
    .factory('connectWithDb', ['$http', function($http) {

    return {
        insertRow : function (data) {
            console.log('insertRow ', data);
            $http.post("http://localhost:8000/music-album", data).then(function(data, status) {
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
        updateRow : function (data) {

            $http.put('http://localhost:8000/music-album/' + data.id);
        },
        deleteRow : function (id) {
            console.log('id ', id);

            $http.delete('http://localhost:8000/music-album/' + id).then(function(data, status) {
                console.log('data ', data);
                console.log('status ', status);
            });

        }

    };
}]);

