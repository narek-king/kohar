
angular.module('kohar.services')
    .factory('photoAlbumServices', ['$http', 'Upload', 'appConstants', function($http, Upload, appConstants) {

    return {
        insertRow : function (data) {

            console.log('data ', data);

            return Upload.upload({
                url: appConstants.url + '/photo-album',
                data: data,
            })
        },
        getAll: function(page, options) {

            return $http.get(appConstants.url + '/api/photo-album-image', { params: options, cache: false});
        },
        updateRow : function (data) {

            console.log(data);
            console.log(typeof data.cover);


            if(data.cover && typeof data.cover == "object"){

                return Upload.upload({
                    url: appConstants.url + '/photo-album/' + data.id,
                    data: data
                });

            }else{

                return $http.post(appConstants.url + '/photo-album/' + data.id, data);
            }
            return $http.post(appConstants.url + '/photo-album/' + data.id, data);

        },
        deleteRow : function (id) {

            $http.delete(appConstants.url + '/photo-album/' + id).then(function(data, status) {
                console.log('data ', data);
            });

        }

    };
}]);

