console.log("musicAlbumsServices ");

angular.module('kohar.services', [])
    .factory('musicAlbumsServices', ['$http', 'Upload', function($http, Upload) {

    return {
        insertRow : function (data) {

            return Upload.upload({
                url: 'http://localhost:8000/music-album',
                data: data,
            })
        },
        getAll: function() {
            return $http({
                method: 'GET',
                url: 'http://localhost:8000/api/music-album'
            });
        },
        updateRow : function (data) {

          console.log('updateRow Service');
          console.log(data);

            if(data.file && data.filename){
                console.log('data.filename exists');
                Upload.upload({
                    url: 'http://localhost:8000/music-album/' + data.id,
                    data: data,
                    method: 'PUT',
                })
            }

            return $http.put('http://localhost:8000/music-album/' + data.id, data);
        },
        deleteRow : function (id) {
            console.log('id ', id);

            $http.delete('http://localhost:8000/music-album/' + id).then(function(data, status) {
                console.log('data ', data);
                console.log('status ', status);
            });

        }

    };
}]);

