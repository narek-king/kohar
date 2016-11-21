'use strict';

angular.module('kohar')
    .constant("appConstants", {
        "url": "http://localhost:8000",
        "port": "8000",
        "common_styles" : {
            "enableSorting": true,
            "useExternalPagination": true,
            "enableRowSelection": true,
            "enableSelectAll": true,
            "multiSelect": true,
            "rowHeight":35,
        },

    });
