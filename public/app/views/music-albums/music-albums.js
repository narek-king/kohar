'use strict';

angular.module('kohar.music-albums', [])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/music-albums', {
            templateUrl: 'app/views/music-albums/music-albums.html',
            controller: 'MusicAlbumsCtrl'
        });
    }])
    .controller('MusicAlbumsCtrl', ['$scope', '$http', '$timeout', '$rootScope', 'uiGridValidateService', 'uiGridConstants', 'musicAlbumsServices', '$uibModal',
        function($scope, $http, $timeout, $rootScope, uiGridValidateService, uiGridConstants, musicAlbumsServices, $uibModal) {

            /* Preview updated image */
            $scope.storeFile = function (gridRow, gridCol, files) {

                console.log('arguments ', gridRow );

                updateRow({
                    id :  gridRow.entity.id,
                    large : files[0]
                }, {field : "large"}, files[0], null, gridRow.entity.imagePath);

            };


        $scope.gridOptions = {
            enableSorting: true,
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 10,
            enableRowSelection :  true,
            enableSelectAll: true,
            multiSelect : true,
            rowHeight:35,
            columnDefs: [
                { field: 'id',
                    cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
                        if (grid.getCellValue(row,col) === 'Velity') {
                            return 'blue';
                        }
                    },
                    enableCellEdit: false,
                    width: "50"
                },
                {
                    field: 'name',
                    cellClass:'red',
                    enableCellEdit: true,
                    minWidth: 200,
                    validators: {required: true},
                    cellTemplate: 'ui-grid/cellTitleValidator'
                },
                {
                    field: 'coverImage',
                    cellClass:'k_height styled_file_container',
                    enableCellEdit: true,
                    type: 'file',
                    width: 200,
                    cellTemplate: '<div>Load large image <img class="k_image_upload" ng-init="row.entity.imagePath = \'http://localhost:8000/images/music/\' + row.entity.id + \'/large.png\'" ng-src="{{row.entity.imagePath}}"></div>',
                    //cellTemplate : '<div class="ui-grid-cell-contents">' +
                    //    '<div class="file_container">large' +
                    //        '<input type="file" class="form-control" ng-model="row.entity.coverImage" name="large" accept="image/*"></div>' +
                    //        '<img class="k_image_upload" ng-src="images/music/{{row.entity.id}}/large.png">' +
                        //'<preview-image image-name="large" image-id="{{row.entity.id}}" ng-model="row.entity.coverImage"></preview-image>' +
                        //'<preview-image image-name="small" ng-model="row.entity.id"></preview-image>' +
                    //'</div>',
                    editableCellTemplate: 'ui-grid/fileChooserEditor',
                    editFileChooserCallback: $scope.storeFile
                },

                {
                    field: 'cover',
                    name : "Image",
                    cellClass:'k_height',
                    enableCellEdit: false,
                    width: 80,
                    cellTemplate: '<div class="ui-grid-cell-contents">' +
                        '<photo-directive class="k_image_admin" image-src="http://localhost:8000/images/music/{{row.entity.id}}/large.png"></photo-directive>' +
                    '</div>'
                },
             /*   {
                    field: 'coverImageSmall',
                    cellClass:'k_height styled_file_container',
                    enableCellEdit: true,
                    type: 'file',
                    width: 200,
                    cellTemplate: '<div>Load Small image <img class="k_image_upload" ng-src="http://localhost:8000/images/music/{{row.entity.id}}/large.png"></div>',
                    editableCellTemplate: 'ui-grid/fileChooserEditor',
                    editFileChooserCallback: $scope.storeFile
                },
                {
                    field: 'cover',
                    name : "Image",
                    cellClass:'k_height',
                    enableCellEdit: false,
                    width: 80,
                    cellTemplate: '<div class="ui-grid-cell-contents">' +
                        '<photo-directive class="k_image_admin" image-src="http://localhost:8000/images/music/{{row.entity.id}}/large.png"></photo-directive>' +
                    '</div>'
                }, */
            ],

            onRegisterApi : function(gridApi){
                //set gridApi on scope
                $scope.gridApi = gridApi;

                // add new row to database after edit
                gridApi.edit.on.afterCellEdit($scope, updateRow);

            }

        };

        function updateRow(rowEntity, colDef, newValue, oldValue, imagePath) {
            /***************************************************************/
            /**************************** UPDATE ***************************/
            /***************************************************************/

            var dataSent = {};

            if(!newValue)
                return;
            if(newValue == oldValue)
                return;

            dataSent.id = rowEntity.id;
            dataSent[colDef.field] = newValue;

            console.log('data to send ', dataSent);

            console.log('rowEntity before updateRow ');
            console.log(rowEntity);

            musicAlbumsServices.updateRow(dataSent).then(function(data, status) {

                console.log('updated data ', data);

                /*
                   $timeout(function() {

                    $scope.$apply(function()
                    {
                        //$scope.imagePaths = 'http://mywebsite/assets/now.png?_ts=' + new Date().getTime();
                        $scope.imageSource = imagePath;

                    });
                });
                */

                console.log('rowEntity ');
                console.log(rowEntity);
                rowEntity.$update( function( response ) {
                    $scope.error = null;
                }, function( error ) {
                    $scope.error = error;
                });

            }, function (response) {

                if (response.status > 0){
                    $scope.errorMsg = response.status + ': ' + response.data;
                }

            });


        }

        /***************************************************************/
        /**************************** READ *****************************/
        /***************************************************************/
        // connect with custom service and receive results from http.get() request
        musicAlbumsServices.getAll().then(function successCallback(response) {

            $scope.gridOptions.data = response.data.data;

        });

        // add row
        $scope.addData = function () {

            $scope.items = $scope.add_row;

            var modalInstance = $uibModal.open({
                animation: this.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'myModalContent.html',
                controller: ModalInstanceCtrl,
                controllerAs: 'this',
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {

            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };


        $scope.deleteSelected = function(){

            var idArray = $scope.gridApi.selection.getSelectedRows();
            for(var i = 0; i < idArray.length; i++){
                musicAlbumsServices.deleteRow(idArray[i].id);
            }

            angular.forEach($scope.gridApi.selection.getSelectedRows(), function (data, index) {

                $scope.gridOptions.data.splice($scope.gridOptions.data.lastIndexOf(data), 1);

            });
        };
        $scope.clearAll = function() {
            $scope.gridApi.selection.clearSelectedRows();
        };


        $scope.$on('setGridOption', function (event, data) {
            $scope.gridOptions.data.unshift(data);
        });

    }]);


var ModalInstanceCtrl = function ($scope, $http, $rootScope, uiGridConstants, $uibModalInstance, musicAlbumsServices, Upload,  $timeout ) {


    $scope.uploadPic = function(fileLarge, fileSmall) {


        var add_new_row = {
            name: $scope.name,
            small: fileSmall,
            large : fileLarge
        };

        musicAlbumsServices.insertRow(add_new_row).then(function (response) {
            $timeout(function () {

                if(response.data.data == "success"){

                    console.log('response.data[0] ', response);

                    add_new_row.id = response.data[0].id;
                    var large_img_path = "images/music/" + add_new_row.id + "/large.png";
                    add_new_row.large_img = large_img_path;

                    var small_img_path = "images/music/" + add_new_row.id + "/small.png";

                    add_new_row.small_img = small_img_path;

                    console.log(add_new_row);
                    $rootScope.$broadcast('setGridOption', add_new_row);

                    $uibModalInstance.close();
                }
            });
        }, function (response) {

            if (response.status > 0){
                $scope.errorMsg = response.status + ': ' + response.data;
            }
        }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            fileLarge.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            fileSmall.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

        });


    }

    $uibModalInstance.close();

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};