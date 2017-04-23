angular.module("project").controller("processCtrl", ["$scope", "$http", 'restService', 'postService', 'spinnerService', function ($scope, $http, restService, postService, spinnerService) {

    $scope.columns = restService.uniques;
    $scope.file = restService.file;

    //Adds or removes header by selection
    $scope.selectedHeaders = [];
    $scope.createdFilters = [];

    $scope.selectFunc = function (key, header) {
        var i = $scope.selectedHeaders.indexOf(key + ":" + header);

        // Is currently selected
        if (i > -1) {
            $scope.selectedHeaders.splice(i, 1);
        }

        // Is newly selected
        else {
            $scope.selectedHeaders.push(key + ":" + header);
        }

        console.log($scope.selectedHeaders);
    };

    //Adds a hierarchy to the array
    $scope.addHierarchy = function(){
        $scope.createdFilters.push({"id":$scope.createdFilters.length, "headers": $scope.selectedHeaders});
        $scope.selectedHeaders = [];
    };

    $scope.getHierarchy = function(id){
      $scope.selectedHeaders = $scope.createdFilters[id].headers;
    };

    $scope.selectionContains = function(key, value){
        return $scope.selectedHeaders.indexOf(key + ":" + value);
    };

    $scope.resetData = function(){
        $scope.selectedHeaders = [];
    };

    //SidebarSizing



}]);




