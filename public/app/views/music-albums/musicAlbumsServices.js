console.log("musicAlbumsServices ");

angular.module('kohar.services', [])
    .factory('musicAlbumsServices', ['$http', function($http) {

    return {
        insertRow : function (data) {
            console.log('insertRow ', data);

            var options = {
                withCredentials: true,
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined,
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'

                }
            };
            $http.post("http://localhost:8000/music-album", data, options).then(function(data, status) {
                console.log('data ', data);
                console.log('status ', status);
            });
        },
        getAll: function() {
            return $http({
                method: 'GET',
                url: 'http://localhost:8000/api/music-album'
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

