console.log('timeConverter ');

angular.module('kohar.timeConverter').filter('timeConverter', function (){

    return function(input) {

        console.log(input);

        var myDate = parseInt(input);

        //return new Date(myDate);
    };
});

