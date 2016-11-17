console.log("musicAlbumsServices ");

angular.module('kohar.services')
    .factory('musicAlbumsServices', ['$http', 'Upload', function($http, Upload) {

    return {
        insertRow : function (data) {

            return Upload.upload({
                url: 'http://localhost:8000/music-album',
                data: data,
            })
        },
        getAll: function() {

            return $http({
                method: 'GET',
                url: 'http://localhost:8000/api/music-album'
            });
        },
        updateRow : function (data) {

            if(data.large || data.small){

                return Upload.upload({
                    url: 'http://localhost:8000/music-album/' + data.id,
                    data: data
                });

            }else{

                return $http.put('http://localhost:8000/music-album/' + data.id, data);
            }

        },
        deleteRow : function (id) {

            $http.delete('http://localhost:8000/music-album/' + id).then(function(data, status) {
                console.log('data ', data);
            });

        }

    };
}]);

