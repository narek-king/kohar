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
                {
                    field: 'cover',
                    cellClass:'k_height',
                    enableCellEdit: true,
                    minWidth: 150,
                    cellTemplate: '<div class="ui-grid-cell-contents"><input type="file" class="k_input form-control" value="cover"></div>'
                },
                {
                    field: 'cover',
                    name : "Image",
                    cellClass:'k_height',
                    enableCellEdit: true,
                    width: 80
                    //cellTemplate: '<div class="ui-grid-cell-contents"><img class="k_image_admin" src="app/resources/img/1.jpg" alt="my image"></div>'
                },
                { field: 'created_at', name : "Created", type: 'date', width: '15%'},
                { field: 'updated_at', name : "Updated", type: 'date', width: '15%'},
            ],

            onRegisterApi : function(gridApi){
                //set gridApi on scope
                $scope.gridApi = gridApi;

                // add new row to database after edit
                gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                    //Do your REST call here via $http.get or $http.post
                    var newRow = {
                        "column" : colDef.name,
                        "id": rowEntity.id,
                        "name": rowEntity.name,
                        "cover": rowEntity.cover,
                        "created_at": rowEntity.created_at,
                        "updated_at": rowEntity.updated_at
                    };
                    connectWithDb.insertRow(newRow);
                    //Alert to show what info about the edit is available
                    //alert('Name: ' + colDef.name + ' ID: ' + rowEntity.id + ' Name: ' + rowEntity.name + ' Created: ' + rowEntity.created_at);

                });
            }

        };

        // connect with custom service
        // receive results from http.get() request
        /******************* READ ********************/
        connectWithDb.getAll().then(function successCallback(response) {

            $scope.gridOptions.data = response.data.data;

        });

        // add row
        $scope.addData = function() {
            var n = $scope.gridOptions.data.length + 1;
            $scope.gridOptions.data.unshift({
                //"id": n,
                "name": "",
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