console.log("musicServices ");

angular.module('kohar.services', [])
    .factory('musicServices', ['$http', 'Upload', 'appConstants', function($http, Upload, appConstants) {

        return {
            insertRow : function (data) {

                console.log('data to insert : ', data);

                return Upload.upload({
                    url: appConstants.url + '/music',
                    data: data,
                });

            },

            getAll: function() {

                return $http({
                    method: 'GET',
                    url: appConstants.url + '/api/music'
                });

            },
            updateRow : function (data) {

                if(data.large || data.small){

                    return Upload.upload({
                        url: appConstants.url + '/music' + data.id,
                        data: data
                    });

                }else{

                    return $http.put(appConstants.url + '/music' + data.id, data);
                }

            },
            deleteRow : function (id) {

                $http.delete(appConstants.url + '/music' + id).then(function(data, status) {
                    console.log('data ', data);
                });

            }

        };
    }]);

