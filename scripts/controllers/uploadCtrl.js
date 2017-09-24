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
        postService.getData(restService.url + "process", $scope.s1, $scope.s2)
        //If everything goes right
            .then(function success(response) {
                postService.data = response.data;               //Pass data to service
                $location.path('/result');                      //Change view to result

                //If an error happens
            }, function error(response) {
                swal('Error!', 'An error ocurred :(', 'error');  //Notify error

                //Finally
            }).finally(function () {
            $('#processModal').modal('close');                   //Close modal
            $scope.processing = false;                           //Hide spinner enable input
        });
    };

    //Post file with sentences
    $scope.submitFile = function () {

        //Show spinner
        spinnerService.show('booksSpinner');
        $scope.loading = true;


        var uploadUrl = restService.url;

        postService.post(uploadUrl + "processFile", $scope.data.file)
            .then(function success(response) {
                swal('Done!', 'Your file was uploaded!', 'success')
                    .then(function () {
                        postService.data = response.data;               //Pass data to service
                        $location.path('/result');                      //Change view to result
                    });

            }, function error(response) {
                swal('Error!', 'An error ocurred :(', 'error');

            }).finally(function () {

            //Close modal
            $('#uploadModal').modal('close');
            $scope.loading = false;
            spinnerService.hide('booksSpinner');

        });
    };


}]);