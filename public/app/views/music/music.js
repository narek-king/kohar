'use strict';

angular.module('kohar.music', [])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/music', {
            templateUrl: 'app/views/music/music.html',
            controller: 'MusicCtrl'
        });
    }])
    .controller('MusicCtrl', ['$scope', '$http', '$timeout', '$rootScope', 'uiGridValidateService', 'uiGridConstants', '$uibModal', 'musicServices', 'musicAlbumsServices',
        function($scope, $http, $timeout, $rootScope, uiGridValidateService, uiGridConstants, $uibModal, musicServices, musicAlbumsServices) {

            $scope.gridOptions = {
                enableSorting: true,
                useExternalPagination: true,
                paginationPageSizes: [33],
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
                        field: 'track',
                        cellClass:'red',
                        enableCellEdit: true,
                        minWidth: 200,
                        validators: {required: true},
                    },
                    {
                        field: 'Lyrics (Arm.)',
                        cellClass:'k_height styled_file_container',
                        enableCellEdit: true,
                        type: 'file',
                        width: 200,
                        cellTemplate: '<div>Load file </div>',
                        editableCellTemplate: 'ui-grid/fileChooserEditor',
                        editFileChooserCallback: $scope.storeFile
                    },
                    {
                        field: 'Lyrics (Eng.)',
                        cellClass:'k_height styled_file_container',
                        enableCellEdit: true,
                        type: 'file',
                        width: 200,
                        cellTemplate: '<div>Load file </div>',
                        editableCellTemplate: 'ui-grid/fileChooserEditor',
                        editFileChooserCallback: $scope.storeFile
                    },
                    {
                        field: 'performer',
                        cellClass:'red',
                        enableCellEdit: true,
                        minWidth: 200,
                        validators: {required: true},
                        cellTemplate: 'ui-grid/cellTitleValidator'
                    },
                    {
                        field: 'music_by',
                        cellClass:'red',
                        enableCellEdit: true,
                        minWidth: 200,
                        validators: {required: true},
                    },
                    {
                        field: 'music_album_id',
                        cellClass:'red',
                        enableCellEdit: true,
                        minWidth: 200,
                        validators: {required: true},
                    }
                ],

                onRegisterApi : function(gridApi){
                    //set gridApi on scope
                    $scope.gridApi = gridApi;

                    // add new row to database after edit
                    gridApi.edit.on.afterCellEdit($scope, updateRow);

                    gridApi.pagination.on.paginationChanged($scope, function (page, limit) {

                        musicServices.getAll(page, {page: page}).then(function successCallback(response) {

                            $scope.gridOptions.data = response.data.data;
                            $scope.gridOptions.totalItems = response.data.total;

                        });
                    });

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


                musicServices.updateRow(dataSent).then(function(data, status) {
                    
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
            // get album id and name
            var get_album_data = {};

            musicAlbumsServices.getAll().then(function successCallback(response) {

                for(var i = 0; i < response.data.data.length; i++){

                    get_album_data[response.data.data[i].id] = response.data.data[i].name;
                }

            });

            // connect with custom service and receive results from http.get() request
            musicServices.getAll().then(function successCallback(response) {

                $scope.gridOptions.data = response.data.data;
                $scope.gridOptions.totalItems = response.data.total;

            });

            // add row
            $scope.addData = function () {

                $scope.get_album_data = get_album_data;

                var modalInstance = $uibModal.open({
                    animation: this.animationsEnabled,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'myModalContent2.html',
                    controller: musicModal,
                    controllerAs: 'this',
                    resolve: {
                        items: function () {
                            return $scope.get_album_data;
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
                    musicServices.deleteRow(idArray[i].id);
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



var musicModal = function ($scope, $http, $rootScope, uiGridConstants, $uibModalInstance, musicServices, Upload,  $timeout, items ) {

    $scope.items = items;

    $scope.addMusic = function(lyricsFileArm, lyricsFileEng) {

        var add_new_music = {
            album_id: $scope.select_album,
            track: $scope.track,
            performer: $scope.performer,
            link: $scope.link,
            lyrics_en: lyricsFileEng,
            lyrics_am : lyricsFileArm
        };

        musicServices.insertRow(add_new_music).then(function (response) {

        }, function (response) {

            if (response.status > 0){
                $scope.errorMsg = response.status + ': ' + response.data;
            }
        }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            lyricsFileArm.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            lyricsFileEng.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

        });


    }

    $uibModalInstance.close();

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};
