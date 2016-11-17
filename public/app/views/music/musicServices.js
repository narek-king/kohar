console.log("musicServices ");

angular.module('kohar.services', [])
    .factory('musicServices', ['$http', 'Upload', function($http, Upload) {

        return {
            insertRow : function (data) {

                console.log('data to insert : ', data);

                return Upload.upload({
                    url: 'http://localhost:8000/music',
                    data: data,
                });

            },

            getAll: function() {

                return $http({
                    method: 'GET',
                    url: 'http://localhost:8000/api/music'
                });

            },
            updateRow : function (data) {

                if(data.large || data.small){

                    return Upload.upload({
                        url: 'http://localhost:8000/music' + data.id,
                        data: data
                    });

                }else{

                    return $http.put('http://localhost:8000/music' + data.id, data);
                }

            },
            deleteRow : function (id) {

                $http.delete('http://localhost:8000/music' + id).then(function(data, status) {
                    console.log('data ', data);
                });

            }

        };
    }]);

