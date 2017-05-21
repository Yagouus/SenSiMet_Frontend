angular.module("project").controller("navbarCtrl", ["$scope", "$http", 'restService', 'postService', 'spinnerService', function ($scope, $http, restService, postService, spinnerService) {
    $('.target').pushpin({
        top: $(window).height() - 80
    });
    $(window).resize(function () {
        $('.target').pushpin({
            top: $(window).height() - 80
        });
    });
    $(".button-collapse").sideNav();
}]);