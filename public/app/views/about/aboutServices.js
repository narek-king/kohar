angular.module('kohar.services')
    .factory('aboutServices', ['$http', 'Upload', 'appConstants', function($http, Upload, appConstants) {

        return {
            insertRow : function (data) {

                return Upload.upload({
                    url: appConstants.url + '/about',
                    data: data,
                })
            },
            getAll: function(page, options) {

                return $http({
                    method: 'GET',
                    url: appConstants.url + '/api/about',
                    params: options
                });
            },
            updateRow : function (data) {

                if(data.imageFile){

                    return Upload.upload({
                        url: appConstants.url + '/about/' + data.id,
                        data: data
                    });

                }else{

                    return $http.post(appConstants.url + '/concert/' + data.id, data);
                }

            },
            deleteRow : function (id) {

                $http.delete(appConstants.url + '/about/' + id).then(function(data, status) {
                    console.log('data ', data);
                });

            }

        };
    }]);