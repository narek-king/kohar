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
                gridRow.entity.large = files[0];

                updateRow(gridRow.entity, {field : "large"}, files[0], null, gridRow.entity.imagePath);

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
                    field: 'Large Image',
                    cellClass:'k_height styled_file_container',
                    enableCellEdit: true,
                    type: 'file',
                    width: 200,
                    cellTemplate: '<div ng-init="row.entity.imagePath = \'http://localhost:8000/images/music/\' + row.entity.id + \'/large.png\'">Load large image ' +
                        //'<img class="k_image_upload" ng-init="row.entity.imagePath = \'http://localhost:8000/images/music/\' + row.entity.id + \'/large.png\'" ng-src="{{row.entity.imagePath}}">' +
                        '<photo-directive class="k_image_upload" image-src="{{row.entity.imagePath}}"></photo-directive>' +
                    '</div>',
                    editableCellTemplate: 'ui-grid/fileChooserEditor',
                    editFileChooserCallback: $scope.storeFile
                },
                {
                    field: 'Small Image',
                    cellClass:'k_height styled_file_container',
                    enableCellEdit: true,
                    type: 'file',
                    width: 200,
                    cellTemplate: '<div ng-init="row.entity.imagePath = \'http://localhost:8000/images/music/\' + row.entity.id + \'/small.png\'">Load large image ' +
                        '<photo-directive class="k_image_upload" image-src="{{row.entity.imagePath}}"></photo-directive>' +
                    '</div>',
                    editableCellTemplate: 'ui-grid/fileChooserEditor',
                    editFileChooserCallback: $scope.storeFile
                },
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

            $timeout(function() {

                $scope.$apply(function() {
                    rowEntity.imagePath = 'http://localhost:8000/images/music/' + rowEntity.id + '/large.png?_ts=' + new Date().getTime()
                });
            });


            var dataSent = {};

            if(!newValue)
                return;
            if(newValue == oldValue)
                return;

            dataSent.id = rowEntity.id;
            dataSent[colDef.field] = newValue;


            musicAlbumsServices.updateRow(dataSent).then(function(data, status) {


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