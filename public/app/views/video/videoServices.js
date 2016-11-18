console.log("videoServices ");

angular.module('kohar.services')
    .factory('videoServices', ['$http', 'Upload', function($http, Upload) {

    return {
        insertRow : function (data) {

            return  $http({
                method: 'POST',
                url: 'http://localhost:8000/api/video',
                data: data
            });
        },
        getAll: function(page, options) {

            return $http.get('http://localhost:8000/api/video', { params: options});
        },
        updateRow : function (data) {

            if(data.large || data.small){

                return Upload.upload({
                    url: 'http://localhost:8000/video/' + data.id,
                    data: data
                });

            }else{

                return $http.post('http://localhost:8000/video/' + data.id, data);
            }

        },
        deleteRow : function (id) {

            $http.delete('http://localhost:8000/video/' + id).then(function(data, status) {
                console.log('data ', data);
            });

        }

    };
}]);

