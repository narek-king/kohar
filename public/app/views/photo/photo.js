'use strict';

angular.module('kohar.photo', [])
    .config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/photo', {
            templateUrl: 'app/views/photo/photo.html',
            controller: 'PhotoCtrl'
        });
    }])
    .controller('PhotoCtrl', ['$scope', '$http', '$timeout', '$rootScope', 'uiGridValidateService', 'uiGridConstants', 'photoServices', '$uibModal', 'photoAlbumServices', 'appConstants',
        function($scope, $http, $timeout, $rootScope, uiGridValidateService, uiGridConstants, photoServices, $uibModal, photoAlbumServices, appConstants) {

            /* Preview updated image */
            $scope.storeFile = function (gridRow, gridCol, files) {

                gridRow.entity.imageFile = files[0];
                updateRow(gridRow.entity, {field : "imageFile"}, files[0], "imageFile");

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
                        field: 'photo_album_id',
                        cellClass:'red',
                        enableCellEdit: true,
                        minWidth: 200,
                        validators: {required: true},
                    },
                    {
                        name: 'Cover',
                        field: 'image',
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

                        photoServices.getAll(page, {page: page}).then(function successCallback(response) {

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

                dataSent = rowEntity;


                photoServices.updateRow(dataSent).then(function(data, status) {

                    console.log('updateRow response ', data);

                    if(rowEntity.image){
                        console.log('image inside ');
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
            // get album id and name
            var get_album_data = {};

            photoAlbumServices.getAll().then(function successCallback(response) {

                for(var i = 0; i < response.data.data.length; i++){

                    get_album_data[response.data.data[i].id] = response.data.data[i].name;
                }

            });
            // connect with custom service and receive results from http.get() request
            photoServices.getAll().then(function successCallback(response) {

                $scope.gridOptions.data = response.data.data;
                $scope.gridOptions.totalItems = response.data.total;


            });

            // add row
            $scope.addData = function () {

                $scope.get_photo_album_data = get_album_data;

                var modalInstance = $uibModal.open({
                    animation: this.animationsEnabled,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'photoModalContent.html',
                    controller: PhotoModal,
                    controllerAs: 'this',
                    resolve: {
                        items: function () {
                            return $scope.get_photo_album_data;
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
                    photoServices.deleteRow(idArray[i].id);
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


var PhotoModal = function ($scope, $http, $rootScope, uiGridConstants, $uibModalInstance, photoServices, Upload,  $timeout, items ) {

    $scope.items = items;

    $scope.uploadPic = function(photoImage) {

        var add_new_row = {
            image : photoImage,
            name: $scope.name,
            album_id: $scope.photo_album_id
        };

        photoServices.insertRow(add_new_row).then(function (response) {

            if(response.data.data == "success"){

                add_new_row.id = response.data[0].id;
                $rootScope.$broadcast('setGridOption', add_new_row);

                $uibModalInstance.close();
            }
        }, function (response) {

            if (response.status > 0){
                $scope.errorMsg = response.status + ': ' + response.data;
            }
        }, function (evt) {

            // Math.min is to fix IE which reports 200% sometimes
            photoImage.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

        });

    }

    $uibModalInstance.close();

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};