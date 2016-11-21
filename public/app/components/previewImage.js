angular.module('kohar.previewImage', [])
    .directive('previewImage', function() {

        return {
            restrict : "E",
            scope : {
                imageName : '@',
                imageId : '@',
                ngModel : '='
            },
            template: '<div class="file_container">{{name}}' +
                '<input type="file" class="form-control" ng-model="image_src" name="{{name | lowercase}}" accept="image/*"></div>' +
                '<img class="k_image_upload" ng-src="{{image_source}}">',

            link: function($scope,el){
                $scope.image_source = "images/music/" + $scope.imageId + "/" + $scope.imageName + ".png";
                $scope.image_src = '';
                $scope.name = $scope.imageName;

                el.bind("change", function(e){

                    $scope.ngModel = e.target.files[0].name;

                })

            }

        }
    });

