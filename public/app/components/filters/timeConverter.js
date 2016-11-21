console.log('timeConverter ');

angular.module('kohar').filter('timeConverter', function (){

    return function(input) {

        var dateString = parseInt(input);
        var newDateString = new Date(dateString).toLocaleString();

        return newDateString;
    };
});

