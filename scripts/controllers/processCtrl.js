angular.module("project").controller("processCtrl", ["$scope", "$http", 'restService', 'postService', 'spinnerService', function ($scope, $http, restService, postService, spinnerService) {

    $scope.data = postService.data;

    console.log($scope.data);

}]);




