console.log("concertsServices ");

angular.module('kohar.services')
    .factory('concertsServices', ['$http', 'Upload', 'appConstants', function($http, Upload, appConstants) {

    return {
        insertRow : function (data) {

            console.log('insertRow ', data);

            return Upload.upload({
                url: appConstants.url + '/concert',
                data: data,
            })
        },
        getAll: function() {

            return $http({
                method: 'GET',
                url: appConstants.url + '/api/concert'
            });
        },
        updateRow : function (data) {

            if(data.large || data.small){

                return Upload.upload({
                    url: appConstants.url + '/concert/' + data.id,
                    data: data
                });

            }else{

                return $http.post(appConstants.url + '/concert/' + data.id, data);
            }

        },
        deleteRow : function (id) {

            $http.delete(appConstants.url + '/concert/' + id).then(function(data, status) {
                console.log('data ', data);
            });

        }

    };
}]);

