'use strict';

angular.module('kohar.music-albums', ['ngAnimate', 'ngRoute', 'ngTouch', 'ui.bootstrap',
    'ui.grid', 'ui.grid.pagination', 'ui.grid.edit', 'ui.grid.resizeColumns', 'ui.grid.validate', 'ui.grid.selection', 'kohar.photo'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/music-albums', {
            templateUrl: 'app/views/music-albums/music-albums.html',
            controller: 'MusicAlbumsCtrl'
        });
    }])
    .controller('MusicAlbumsCtrl', ['$scope', '$http', '$timeout', 'uiGridValidateService', 'uiGridConstants', 'connectWithDb',
        function($scope, $http, $timeout, uiGridValidateService, uiGridConstants, connectWithDb) {

        $scope.gridOptions = {
            enableSorting: true,
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 4,
            enableRowSelection :  true,
            enableSelectAll: true,
            multiSelect : true,
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
                    field: 'cover',
                    cellClass:'k_height',
                    enableCellEdit: true,
                    minWidth: 150,
                    cellTemplate: '<div class="ui-grid-cell-contents"><input type="file" class="form-control" value="cover"></div>'
                },
                {
                    field: 'cover',
                    name : "Image",
                    cellClass:'k_height',
                    enableCellEdit: false,
                    width: 80,
                    cellTemplate: '<div class="ui-grid-cell-contents"><photo-directive class="k_image_admin" image-src="app/resources/img/1.jpg"></photo-directive></div>'
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
                    connectWithDb.updateRow(rowEntity);

                });
            }

        };


        /***************************************************************/
        /**************************** READ *****************************/
        /***************************************************************/
        // connect with custom service and receive results from http.get() request
        connectWithDb.getAll().then(function successCallback(response) {

            $scope.gridOptions.data = response.data.data;

        });



        // add row
        $scope.addData = function() {
            var n = $scope.gridOptions.data.length + 1;
            var newRow = {
                "name": "",
                "cover": "",
                "created_at": "",
                "updated_at": ""
            };

            $scope.gridOptions.data.unshift(newRow);

            connectWithDb.insertRow(newRow);
        };

        $scope.deleteSelected = function(){

            var idArray = $scope.gridApi.selection.getSelectedRows();
            for(var i = 0; i < idArray.length; i++){
                connectWithDb.deleteRow(idArray[i].id);
            }

            angular.forEach($scope.gridApi.selection.getSelectedRows(), function (data, index) {

                $scope.gridOptions.data.splice($scope.gridOptions.data.lastIndexOf(data), 1);

            });
        };
        $scope.clearAll = function() {
            $scope.gridApi.selection.clearSelectedRows();
        };

    }]);