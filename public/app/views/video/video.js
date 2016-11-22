'use strict';

angular.module('kohar.video', [])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/video', {
            templateUrl: 'app/views/video/video.html',
            controller: 'VideoCtrl'
        });
    }])
    .controller('VideoCtrl', ['$scope', '$http', '$timeout', '$rootScope', 'uiGridValidateService', 'uiGridConstants', 'videoServices', '$uibModal', 'appConstants',
        function($scope, $http, $timeout, $rootScope, uiGridValidateService, uiGridConstants, videoServices, $uibModal, appConstants) {

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
                        minWidth: 200,
                        validators: {required: true},
                        cellTemplate: 'ui-grid/cellTitleValidator'
                    },
                    {
                        field: 'link',
                        enableCellEdit: true,
                        minWidth: 200,
                        validators: {required: true},
                        cellTemplate: 'ui-grid/cellTitleValidator'
                    },
                    {
                        field: 'performer',
                        enableCellEdit: true,
                        validators: {required: true},
                        cellTemplate: 'ui-grid/cellTitleValidator'
                    },
                    {
                        field: 'music_by',
                        enableCellEdit: true,
                        validators: {required: true},
                        cellTemplate: 'ui-grid/cellTitleValidator'
                    },
                    {
                        field: 'lyrics_by',
                        enableCellEdit: true,
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

                        videoServices.getAll(page, {page: page}).then(function successCallback(response) {

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


                videoServices.updateRow(dataSent).then(function(data, status) {


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
            videoServices.getAll().then(function successCallback(response) {

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
                    templateUrl: 'videoModalContent.html',
                    controller: videoInstanceCtrl,
                    controllerAs: 'this',
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
console.log('Modal Closed ');
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });
            };


            $scope.deleteSelected = function(){

                var idArray = $scope.gridApi.selection.getSelectedRows();
                for(var i = 0; i < idArray.length; i++){
                    videoServices.deleteRow(idArray[i].id);
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


var videoInstanceCtrl = function ($scope, $http, $rootScope, uiGridConstants, $uibModalInstance, videoServices, Upload,  $timeout ) {


    $scope.addVideo = function() {

        var add_new_row = {
            name: $scope.name,
            link: $scope.link,
            performer: $scope.performer,
            music_by: $scope.music_by,
            lyrics_by: $scope.lyrics_by
        };

        console.log('add_new_row ', add_new_row);

        videoServices.insertRow(add_new_row).then(function (response) {
            $timeout(function () {

                if(response.data.data == "success"){

                    add_new_row.id = response.data[0].id;
                    var large_img_path = "images/music/" + add_new_row.id + "/large.png";
                    add_new_row.large_img = large_img_path;

                    var small_img_path = "images/music/" + add_new_row.id + "/small.png";

                    add_new_row.small_img = small_img_path;

                    $rootScope.$broadcast('setGridOption', add_new_row);

                    $uibModalInstance.close();
                }
            });
        }, function (response) {

            if (response.status > 0){
                $scope.errorMsg = response.status + ': ' + response.data;
            }
        }, function (evt) {

        });


    }

    $uibModalInstance.close();

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};