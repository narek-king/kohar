'use strict';

angular.module('kohar')
    .constant("appConstants", {
        "url": "http://localhost:8000",
        "port": "8000",
        "uiGridOptions" : {
            "enableSorting": true,
            "useExternalPagination": true,
            "paginationPageSizes": [15],
            "enableRowSelection": true,
            "enableSelectAll": true,
            "multiSelect": true,
            "rowHeight":35,
        },

    });
