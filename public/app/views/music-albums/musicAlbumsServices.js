console.log("musicAlbumsServices ");

angular.module('kohar.services', [])
    .factory('musicAlbumsServices', ['$http', function($http) {

    return {
        insertRow : function (data) {
            console.log('insertRow ', data);
            var options = {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            };
            $http.post("http://localhost:8000/music-album", data, options).then(function(data, status) {
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
            console.log('service');
            console.log(data);
            $http.put('http://localhost:8000/music-album/' + data.id, data).then(function(data, status) {
                console.log('updated data ', data);
                console.log('updated status ', status);
            });
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

