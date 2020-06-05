var myApp = angular.module('myApp', []);
myApp.controller('auditlogCtrl', function ($scope, $http, $filter) {

    $scope.init = function () {
        console.log('auditlogCtrl');
        
    };
    $scope.init();
});