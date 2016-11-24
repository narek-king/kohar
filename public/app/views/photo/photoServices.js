
angular.module('kohar.services')
    .factory('photoServices', ['$http', 'Upload', 'appConstants', function($http, Upload, appConstants) {

        return {
            insertRow : function (data) {

                return Upload.upload({
                    url: appConstants.url + '/photo',
                    data: data,
                })
            },
            getAll: function(page, options) {

                return $http.get(appConstants.url + '/api/photo', { params: options});
            },
            updateRow : function (data) {

                console.log('updateRow sent ', data);

                if(data.imageFile && typeof data.imageFile == "object"){

                    console.log('my route ', appConstants.url + '/photo/' + data.id);
                    return Upload.upload({
                        url: appConstants.url + '/photo/' + data.id,
                        data: data
                    });

                }else{
                    console.log('else ');
                    return $http.post(appConstants.url + '/photo/' + data.id, data);
                }

            },
            deleteRow : function (id) {

                $http.delete(appConstants.url + '/photo/' + id).then(function(data, status) {
                    console.log('data ', data);
                });

            }

        };
    }]);

