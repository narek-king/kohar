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

                    console.log(e);
                    console.log(e.target.files[0].name);

                    $scope.ngModel = e.target.files[0].name;

                    /*
                    var fileReader = new FileReader();

                    $scope.file = (e.srcElement || e.target).files[0];

                    if (fileReader.readAsDataURL)
                        fileReader.readAsDataURL($scope.file);
                    else if (fileReader.readAsDataurl)
                        fileReader.readAsDataurl($scope.file);

                     fileReader.addEventListener("load", function (e) {

                         console.log('arguments ');

                        $scope.image_source = fileReader.result;

                        $scope.$apply(function () {
                            $scope.ngModel = new Blob([ e.target.result ], { type: "image/png", name : "FlagKilikia.png"} );
                        });

                    }, false); */
                })

            }

        }
    });

