'use strict';

angular.module('kohar.music-albums', ['ngAnimate', 'ngRoute', 'ngTouch', 'ui.bootstrap',
    'ui.grid', 'ui.grid.pagination', 'ui.grid.edit', 'ui.grid.resizeColumns', 'ui.grid.validate', 'ui.grid.selection'])

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
                { field: 'cover', enableCellEdit: true, minWidth: 150},
                { field: 'created_at', name : "Created", type: 'date', width: '15%'},
                { field: 'updated_at', name : "Updated", type: 'date', width: '15%'},
            ],

            onRegisterApi : function(gridApi){
                //set gridApi on scope
                $scope.gridApi = gridApi;
            }
        };

        // connect with custom service
        // receive results from http.get() request
        connectWithDb.getAll().then(function successCallback(response) {
            console.log(response);
            $scope.gridOptions.data = response.data.data;

        });

        // add row
        $scope.addData = function() {
            console.log("addData ");
            var n = $scope.gridOptions.data.length + 1;

            $scope.gridOptions.data.push({
                "id": n,
                "name": "name",
                "cover": "",
                "created_at": "",
                "updated_at": ""
            });
        };

        $scope.deleteSelected = function(){
            angular.forEach($scope.gridApi.selection.getSelectedRows(), function (data, index) {
                $scope.gridOptions.data.splice($scope.gridOptions.data.lastIndexOf(data), 1);
            });
        };
        $scope.clearAll = function() {
            $scope.gridApi.selection.clearSelectedRows();
        };

    }]);