'use strict';

angular.module('kohar.photo-album', [])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/photo-album', {
            templateUrl: 'app/views/photo-album/photo-album.html',
            controller: 'PhotoAlbumCtrl'
        });
    }])
    .controller('PhotoAlbumCtrl', ['$scope', '$http', '$timeout', '$rootScope', 'uiGridValidateService', 'uiGridConstants', 'photoAlbumServices', '$uibModal',
        function($scope, $http, $timeout, $rootScope, uiGridValidateService, uiGridConstants, photoAlbumServices, $uibModal) {

            /* Preview updated image */
            $scope.storeFile = function (gridRow, gridCol, files) {

                gridRow.entity[this.image] = files[0];
                updateRow(gridRow.entity, {field : this.image}, files[0], this.image);

            };
            
            $scope.gridOptions = {
                enableSorting: true,
                useExternalPagination: true,
                paginationPageSizes: [22],
                paginationPageSize: 15,
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
                        field: 'Cover',
                        cellClass:'k_height styled_file_container',
                        enableCellEdit: true,
                        type: 'file',
                        width: 180,
                        cellTemplate: '<div ng-init="row.entity.largeImagePath = \'images/music/\' + row.entity.id + \'/large.png\'">Load Cover ' +
                            //'<img class="k_image_upload" ng-init="row.entity.imagePath = \'http://localhost:8000/images/music/\' + row.entity.id + \'/large.png\'" ng-src="{{row.entity.imagePath}}">' +
                            '<photo-directive class="k_image_upload" image-src="{{row.entity.largeImagePath}}"></photo-directive>' +
                        '</div>',
                        editableCellTemplate: 'ui-grid/fileChooserEditor',
                        editFileChooserCallback: $scope.storeFile.bind({image: "large"})
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

            function updateRow(rowEntity, colDef, newValue, oldValue) {
                /***************************************************************/
                /**************************** UPDATE ***************************/
                /***************************************************************/

                console.log('rowEntity ', rowEntity);

                var dataSent = {};

                if(!newValue)
                    return;
                if(newValue == oldValue)
                    return;

                dataSent = rowEntity;


                photoAlbumServices.updateRow(dataSent).then(function(data, status) {

                    console.log('updateRow then', data);

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


var ModalInstanceCtrl = function ($scope, $http, $rootScope, uiGridConstants, $uibModalInstance, photoAlbumServices, Upload,  $timeout ) {


    $scope.uploadPic = function(coverImage) {

        var add_new_row = {
            cover : coverImage,
            name: $scope.name,
            description: $scope.description
        };

        photoAlbumServices.insertRow(add_new_row).then(function (response) {
            $timeout(function () {

                if(response.data.data == "success"){

                    add_new_row.id = response.data[0].id;
                    var large_img_path = "images/music/" + add_new_row.id + "/large.png";
                    add_new_row.large_img = large_img_path;

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
            coverImage.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

        });


    }

    $uibModalInstance.close();

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};