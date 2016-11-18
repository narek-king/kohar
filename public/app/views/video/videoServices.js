console.log("videoServices ");

angular.module('kohar.services')
    .factory('videoServices', ['$http', 'Upload', function($http, Upload) {

    return {
        insertRow : function (data) {

            console.log('insertRow ', data);
            return  $http({
                method: 'POST',
                url: 'http://localhost:8000/video',
                data: data
            });
        },
        getAll: function(page, options) {

            return $http.get('http://localhost:8000/api/video', { params: options});
        },
        updateRow : function (data) {

            console.log('updateRow ', data);

            return $http.put('http://localhost:8000/video/' + data.id, data);

        },
        deleteRow : function (id) {

            $http.delete('http://localhost:8000/video/' + id).then(function(data, status) {
                console.log('data ', data);
            });

        }

    };
}]);

