angular.module('kohar').filter('timeConverter', function (){

    return function(input) {

        var dateString = parseInt(input);

        return new Date(dateString).toLocaleString();
    };
});

