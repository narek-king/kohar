
angular.module('kohar.services')
    .factory('videoServices', ['$http', 'Upload', 'appConstants', function($http, Upload, appConstants) {

    return {
        insertRow : function (data) {

            return  $http({
                method: 'POST',
                url: appConstants.url + '/video',
                data: data
            });
        },
        getAll: function(page, options) {

            return $http.get(appConstants.url + '/api/video', { params: options});
        },
        updateRow : function (data) {

            return $http.put(appConstants.url + '/video/' + data.id, data);

        },
        deleteRow : function (id) {

            $http.delete(appConstants.url + '/video/' + id).then(function(data, status) {
                console.log('data ', data);
            });

        }

    };
}]);

