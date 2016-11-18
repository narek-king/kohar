console.log("concertsServices ");

angular.module('kohar.services')
    .factory('concertsServices', ['$http', 'Upload', function($http, Upload) {

    return {
        insertRow : function (data) {

            console.log('insertRow ', data);

            return Upload.upload({
                url: 'http://localhost:8000/concert',
                data: data,
            })
        },
        getAll: function() {

            return $http({
                method: 'GET',
                url: 'http://localhost:8000/api/concert'
            });
        },
        updateRow : function (data) {

            if(data.large || data.small){

                return Upload.upload({
                    url: 'http://localhost:8000/concert/' + data.id,
                    data: data
                });

            }else{

                return $http.post('http://localhost:8000/concert/' + data.id, data);
            }

        },
        deleteRow : function (id) {

            $http.delete('http://localhost:8000/concert/' + id).then(function(data, status) {
                console.log('data ', data);
            });

        }

    };
}]);

