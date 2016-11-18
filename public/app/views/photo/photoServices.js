console.log("photoServices ");

angular.module('kohar.services')
    .factory('photoServices', ['$http', 'Upload', function($http, Upload) {

        return {
            insertRow : function (data) {

                console.log('insertRow ', data);

                return Upload.upload({
                    url: 'http://localhost:8000/photo',
                    data: data,
                })
            },
            getAll: function(page, options) {

                return $http.get('http://localhost:8000/api/photo', { params: options});
            },
            updateRow : function (data) {

                console.log('updateRow ', data);

                return $http.post('http://localhost:8000/photo/' + data.id, data);

            },
            deleteRow : function (id) {

                $http.delete('http://localhost:8000/photo/' + id).then(function(data, status) {
                    console.log('data ', data);
                });

            }

        };
    }]);

