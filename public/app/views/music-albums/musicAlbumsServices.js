console.log("musicAlbumsServices ");

angular.module('kohar.services')
    .factory('musicAlbumsServices', ['$http', 'Upload', 'appConstants', function($http, Upload, appConstants) {

    return {
        insertRow : function (data) {

            return Upload.upload({
                url: appConstants.url + '/music-album',
                data: data,
            })
        },
        getAll: function() {

            return $http({
                method: 'GET',
                url: appConstants.url + '/api/music-album-image'
            });
        },
        updateRow : function (data) {

            if(data.large || data.small){

                return Upload.upload({
                    url: appConstants.url + '/music-album/' + data.id,
                    data: data
                });

            }else{

                return $http.post(appConstants.url + '/music-album/' + data.id, data);
            }

        },
        deleteRow : function (id) {

            $http.delete(appConstants.url + '/music-album/' + id).then(function(data, status) {
                console.log('data ', data);
            });

        }

    };
}]);

