angular.module("project").controller("uploadCtrl", ["$scope", "$http", "$location", 'restService', 'postService', 'spinnerService', function ($scope, $http, $location, restService, postService, spinnerService) {

    //Activate modals
    $(".button-collapse").sideNav();
    $('.modal').modal();
    $('.parallax').parallax();
    $('.target').pushpin({
        top: $(window).height() - 80
    });
    $(window).resize(function () {
        $('.target').pushpin({
            top: $(window).height() - 80
        });
    });
    $scope.loading = false;


    //Posts file to server
    $scope.submit = function () {

        //Show spinner
        spinnerService.show('booksSpinner');
        $scope.loading = true;

        var uploadUrl = 'http://localhost:8080/fileUpload';
        postService.post(uploadUrl, $scope.data.file)
            .then(function success(response) {
                swal('Done!', 'Your file was uploaded!', 'success')
                    .then(function () {
                        //Open files modal
                        $('#selectModal').modal('open');
                        $scope.getFiles();
                    });

            }, function error(response) {
                swal('Dang!', 'An error ocurred :(', 'error');

            }).finally(function () {

            //Close modal
            $('#uploadModal').modal('close');
            $scope.loading = false;
            spinnerService.hide('booksSpinner');

        });
    };

    //Gets all files from se
    // rver
    $scope.getFiles = function () {
        restService.get("http://localhost:8080/", "archivos")
            .then(function (response) {
                $scope.files = response.data;
            });
    };

    //Gets headers from the file choosed
    $scope.getHeaders = function (File) {
        $scope.File = File;
        restService.get("http://localhost:8080/", "headers?file=" + File)
            .then(function (response) {
                $scope.headers = response.data;
                //Close modal
                $('#selectModal').modal('close');

            });
    };

    //Adds or removes header by selection
    $scope.selectedHeaders = [];
    $scope.selectFunc = function (header) {
        var i = $scope.selectedHeaders.indexOf(header);

        // Is currently selected
        if (i > -1) {
            $scope.selectedHeaders.splice(i, 1);
        }

        // Is newly selected
        else {
            $scope.selectedHeaders.push(header);
        }
    };

    //Posts headers to server
    $scope.submitSentences = function () {

        //Show spinner //Hide title //Close modal
        spinnerService.show('processSpinner');
        $scope.processing = true;
        $('#filterModal').modal('close');

        var uploadUrl = 'http://localhost:8080/Process';

        postService.postData(uploadUrl, $scope.s1, $scope.s2)
            .then(function success(response) {
                restService.uniques = response.data;
                restService.file = $scope.File;
                $location.path('/process');
            }, function error(response) {
                swal('Dang!', 'An error ocurred :(', 'error');
            }).finally(function () {

            //Close modal
            spinnerService.hide('processSpinner');

        });
    };

}]);