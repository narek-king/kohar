'use strict';

angular.module('kohar.music-albums', ['ngAnimate', 'ngRoute', 'ngTouch', 'ui.bootstrap',
    'ui.grid', 'ui.grid.pagination', 'ui.grid.edit', 'ui.grid.resizeColumns', 'ui.grid.validate', 'ui.grid.selection', 'kohar.photo'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/music-albums', {
            templateUrl: 'app/views/music-albums/music-albums.html',
            controller: 'MusicAlbumsCtrl'
        });
    }])
    .controller('MusicAlbumsCtrl', ['$scope', '$http', '$timeout', 'uiGridValidateService', 'uiGridConstants', 'musicAlbumsServices', '$uibModal',
        function($scope, $http, $timeout, uiGridValidateService, uiGridConstants, musicAlbumsServices, $uibModal) {


        $scope.gridOptions = {
            enableSorting: true,
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 4,
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
                { field: 'name', cellClass:'red', enableCellEdit: true, minWidth: 200, validators: {required: true}, cellTemplate: 'ui-grid/cellTitleValidator'},
                {
                    field: 'Cover Image',
                    cellClass:'k_height',
                    enableCellEdit: true,
                    width: 220,
                    cellTemplate : '<div class="ui-grid-cell-contents">' +
                        '<preview-image image-name="Large"></preview-image>' +
                        '<preview-image image-name="Small"></preview-image>' +
                    '</div>'
                },
                {
                    field: 'cover',
                    name : "Image",
                    cellClass:'k_height',
                    enableCellEdit: false,
                    width: 80,
                    cellTemplate: '<div class="ui-grid-cell-contents">' +
                        '<photo-directive class="k_image_admin" image-src="app/resources/img/1.jpg"></photo-directive>' +
                    '</div>'
                },
                { field: 'created_at', name : "Created", type: 'date', width: '15%'},
                { field: 'updated_at', name : "Updated", type: 'date', width: '15%'},
            ],

            onRegisterApi : function(gridApi){
                //set gridApi on scope
                $scope.gridApi = gridApi;

                // add new row to database after edit
                gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                    /***************************************************************/
                    /**************************** UPDATE ***************************/
                    /***************************************************************/
                    console.log('updateRow ', rowEntity);
                    musicAlbumsServices.updateRow(rowEntity);

                });
            }

        };


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

    }]);


var ModalInstanceCtrl = function ($scope, $uibModalInstance, musicAlbumsServices) {

    $scope.submit = function (myForm) {
        console.log('controller');
        console.log($scope.add_row);

        var formData = new FormData();
        console.log($scope.add_row);

        formData.append('name', $scope.add_row.name);
        formData.append('large', $scope.add_row.large);
        formData.append('small', $scope.add_row.small);

        musicAlbumsServices.insertRow(formData);
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};