console.log("photoAlbumServices ");

angular.module('kohar.services')
    .factory('photoAlbumServices', ['$http', 'Upload', 'appConstants', function($http, Upload, appConstants) {

    return {
        insertRow : function (data) {

            console.log('insertRow ', data);

            return Upload.upload({
                url: appConstants.url + '/photo-album',
                data: data,
            })
        },
        getAll: function(page, options) {

            return $http.get(appConstants.url + '/api/photo-album', { params: options, cache: false});
        },
        updateRow : function (data) {

            console.log('updateRow ', data);

            return $http.post(appConstants.url + '/photo-album/' + data.id, data);

        },
        deleteRow : function (id) {

            $http.delete(appConstants.url + '/photo-album/' + id).then(function(data, status) {
                console.log('data ', data);
            });

        }

    };
}]);

