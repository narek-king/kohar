'use strict';

angular.module('kohar.photo-album', [])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/photo-album', {
            templateUrl: 'app/views/photo-album/photo-album.html',
            controller: 'PhotoAlbumCtrl'
        });
    }])
    .controller('PhotoAlbumCtrl', ['$scope', '$http', '$timeout', '$rootScope', 'uiGridValidateService', 'uiGridConstants', 'photoAlbumServices', '$uibModal', 'appConstants',
        function($scope, $http, $timeout, $rootScope, uiGridValidateService, uiGridConstants, photoAlbumServices, $uibModal, appConstants) {

            /* Preview updated image */
            $scope.storeFile = function (gridRow, gridCol, files) {

                gridRow.entity.cover = files[0];
                updateRow(gridRow.entity, {field : "cover"}, files[0], "cover");

            };
            
            $scope.gridOptions = {
                paginationPageSize: 15,
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
                        validators: {required: true},
                        cellTemplate: 'ui-grid/cellTitleValidator'
                    },
                    {
                        field: 'description',
                        enableCellEdit: true,
                        minWidth: 200,
                        validators: {required: true},
                        cellTemplate: 'ui-grid/cellTitleValidator'
                    },
                    {
                        field: 'cover',
                        cellClass:'k_height styled_file_container',
                        enableCellEdit: true,
                        type: 'file',
                        width: 180,
                        cellTemplate: '<div>Cover image ' +
                            '<img class="k_image_upload" ng-src="{{row.entity.image}}">' +
                        '</div>',
                        editableCellTemplate: 'ui-grid/fileChooserEditor',
                        editFileChooserCallback: $scope.storeFile
                    }
                ],

                onRegisterApi : function(gridApi){
                    //set gridApi on scope
                    $scope.gridApi = gridApi;

                    // add new row to database after edit
                    gridApi.edit.on.afterCellEdit($scope, updateRow);

                    gridApi.pagination.on.paginationChanged($scope, function (page, limit) {

                        photoAlbumServices.getAll(page, {page: page}).then(function successCallback(response) {

                            $scope.gridOptions.data = response.data.data;
                            $scope.gridOptions.totalItems = response.data.total;

                        });
                    });
                }

            };

            angular.extend($scope.gridOptions, appConstants.uiGridOptions);

            function updateRow(rowEntity, colDef, newValue, oldValue) {
                /***************************************************************/
                /**************************** UPDATE ***************************/
                /***************************************************************/

                var dataSent = {};

                if(!newValue)
                    return;
                if(newValue == oldValue)
                    return;

                dataSent = {
                    id: rowEntity.id,
                    cover : rowEntity.cover,
                    name: rowEntity.name,
                    description: rowEntity.description
                };

                photoAlbumServices.updateRow(dataSent).then(function(data, status) {

                    if(rowEntity.image){

                        rowEntity.image = rowEntity.image + '?_ts=' + new Date().getTime();
                    }

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
            photoAlbumServices.getAll().then(function successCallback(response) {

                $scope.gridOptions.data = response.data.data;
                $scope.gridOptions.totalItems = response.data.total;

            });

            // add row
            $scope.addData = function () {

                $scope.items = $scope.add_row;

                var modalInstance = $uibModal.open({
                    animation: this.animationsEnabled,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'photoAlbumModalContent.html',
                    controller: photoAlbumInstanceCtrl,
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
                    photoAlbumServices.deleteRow(idArray[i].id);
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


var photoAlbumInstanceCtrl = function ($scope, $http, $rootScope, uiGridConstants, $uibModalInstance, photoAlbumServices, Upload,  $timeout ) {


    $scope.uploadPic = function(coverImage) {

        var add_new_row = {
            cover : coverImage,
            name: $scope.name,
            description: $scope.description
        };

        photoAlbumServices.insertRow(add_new_row).then(function (response) {

            if(response.data.data == "success"){

                add_new_row.id = response.data[0].id;
                add_new_row.image = "images/photo/" + add_new_row.id + "/image.png";
                $rootScope.$broadcast('setGridOption', add_new_row);

                $uibModalInstance.close();
            }

        }, function (response) {

            if (response.status > 0){
                $scope.errorMsg = response.status + ': ' + response.data;
            }
        }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            coverImage.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

        });

    }

    $uibModalInstance.close();

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};