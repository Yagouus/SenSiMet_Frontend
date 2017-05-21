angular.module("project").controller("uploadCtrl", ["$scope", "$http", "$location", 'restService', 'postService', 'spinnerService', function ($scope, $http, $location, restService, postService, spinnerService) {

    //Materialize
    $('.modal').modal();
    $('.parallax').parallax();

    $scope.loading = false;

    //Posts sentences to server
    $scope.submitSentences = function () {

        //Show spinner and hide input
        $scope.processing = true;

        //Call service to post data
        postService.postData('http://localhost:8080/Process', $scope.s1, $scope.s2)

        //If everything goes right
            .then(function success(response) {
                postService.data = response.data;               //Pass data to service
                $location.path('/result');                      //Change view to result

                //If an error happens
            }, function error(response) {
                swal('Dang!', 'An error ocurred :(', 'error');  //Notify error

                //Finally
            }).finally(function () {
            $('#processModal').modal('close');                   //Close modal
            $scope.processing = false;                           //Hide spinner enable input
        });
    };


}]);