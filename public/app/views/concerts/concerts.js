'use strict';

angular.module('kohar.concerts', [])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/concerts', {
            templateUrl: 'app/views/concerts/concerts.html',
            controller: 'ConcertsCtrl'
        });
    }])
    .controller('ConcertsCtrl', ['$scope', '$http', '$timeout', '$rootScope', 'uiGridValidateService', 'uiGridConstants', 'concertsServices', '$uibModal', 'appConstants',
        function($scope, $http, $timeout, $rootScope, uiGridValidateService, uiGridConstants, concertsServices, $uibModal, appConstants) {



            /* Preview updated image */
            $scope.storeFile = function (gridRow, gridCol, files) {

                gridRow.entity[this.image] = files[0];
                updateRow(gridRow.entity, {field : this.image}, files[0], this.image);

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
                        field: 'Image',
                        cellClass:'k_height styled_file_container',
                        enableCellEdit: true,
                        type: 'file',
                        //width: 180,
                        cellTemplate: '<div>Load large image <img class="k_image_upload" ng-init="row.entity.imagePath = \'http://localhost:8000/images/concerts/\' + row.entity.id + \'/large.png\'" ng-src="{{row.entity.imagePath}}"></div>',
                        editableCellTemplate: 'ui-grid/fileChooserEditor',
                        editFileChooserCallback: $scope.storeFile.bind({image: "large"})
                    },
                    {
                        field: 'country',
                        cellClass:'red',
                        enableCellEdit: true,
                        minWidth: 150,
                        validators: {required: true},
                        cellTemplate: 'ui-grid/cellTitleValidator'
                    },
                    {
                        field: 'city',
                        cellClass:'red',
                        enableCellEdit: true,
                        minWidth: 150,
                        validators: {required: true},
                        cellTemplate: 'ui-grid/cellTitleValidator'
                    },
                    {
                        field: 'place',
                        cellClass:'red',
                        enableCellEdit: true,
                        minWidth: 150,
                        validators: {required: true},
                        cellTemplate: 'ui-grid/cellTitleValidator'
                    },
                    {
                        field: 'date',
                        cellClass:'red',
                        enableCellEdit: true,
                        minWidth: 120,
                        validators: {required: true},
                        cellFilter : 'timeConverter:COL_FIELD'
                    },
                    {
                        field: 'description',
                        cellClass:'red',
                        enableCellEdit: true,
                        minWidth: 180,
                        validators: {required: true},
                        cellTemplate: 'ui-grid/cellTitleValidator'
                    }
                ],

                onRegisterApi : function(gridApi){
                    //set gridApi on scope
                    $scope.gridApi = gridApi;

                    // add new row to database after edit
                    gridApi.edit.on.afterCellEdit($scope, updateRow);

                    gridApi.pagination.on.paginationChanged($scope, function (page, limit) {

                        concertsServices.getAll(page, {page: page}).then(function successCallback(response) {

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

                dataSent.id = rowEntity.id;
                dataSent[colDef.field] = newValue;


                concertsServices.updateRow(dataSent).then(function(data, status) {
                    var path = colDef.field + 'ImagePath';

                    if(rowEntity[path])
                        rowEntity[path] = rowEntity[path] + '?_ts=' + new Date().getTime();

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
            concertsServices.getAll().then(function successCallback(response) {

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
                    templateUrl: 'concertsModalContent.html',
                    controller: ConcertInstanceCtrl,
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
                    concertsServices.deleteRow(idArray[i].id);
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


var ConcertInstanceCtrl = function ($scope, $http, $rootScope, uiGridConstants, $uibModalInstance, concertsServices, Upload,  $timeout ) {


    $scope.uploadPic = function(concertImage) {

        var add_new_row = {
            image : concertImage,
            country: $scope.country,
            city: $scope.city,
            place: $scope.place,
            date: new Date($scope.date).getTime(),
            description: $scope.description,
        };

        concertsServices.insertRow(add_new_row).then(function (response) {
            $timeout(function () {

                if(response.data.data == "success"){

                    add_new_row.id = response.data[0].id;
                    var large_img_path = "images/music/" + add_new_row.id + "/large.png";
                    //add_new_row.large_img = large_img_path;

                    //add_new_row.small_img = small_img_path;

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
            concertImage.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

        });


    }

    $uibModalInstance.close();

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};