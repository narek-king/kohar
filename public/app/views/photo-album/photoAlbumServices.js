console.log("photoAlbumServices ");

angular.module('kohar.services')
    .factory('photoAlbumServices', ['$http', 'Upload', function($http, Upload) {

    return {
        insertRow : function (data) {

            console.log('insertRow ', data);

            return Upload.upload({
                url: 'http://localhost:8000/photo-album',
                data: data,
            })
        },
        getAll: function(page, options) {

            return $http.get('http://localhost:8000/api/photo-album', { params: options});
        },
        updateRow : function (data) {

            console.log('updateRow ', data);

            return $http.post('http://localhost:8000/photo-album/' + data.id, data);

        },
        deleteRow : function (id) {

            $http.delete('http://localhost:8000/photo-album/' + id).then(function(data, status) {
                console.log('data ', data);
            });

        }

    };
}]);

