
angular.module('kohar.services', [])
    .factory('musicServices', ['$http', 'Upload', 'appConstants', function($http, Upload, appConstants) {

        return {
            insertRow : function (data) {

                return Upload.upload({
                    url: appConstants.url + '/music',
                    data: data,
                });

            },
            getAll: function(page, options) {

                return $http({
                    method: 'GET',
                    url: appConstants.url + '/api/music',
                    params: options
                });

            },
            updateRow : function (data) {

                if(data.lyrics_am || data.lyrics_en){

                    return Upload.upload({
                        url: appConstants.url + '/music/' + data.id,
                        data: data
                    });

                }else{

                    return $http.post(appConstants.url + '/music/' + data.id, data);
                }

            },
            deleteRow : function (id) {

                $http.delete(appConstants.url + '/music/' + id).then(function(data, status) {
                    console.log('data ', data);
                });

            }

        };
    }]);

