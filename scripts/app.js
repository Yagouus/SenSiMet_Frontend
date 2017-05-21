//Modules
angular.module("project", ['ngRoute', 'angularSpinners']);

//Sections
angular.module("project").config(["$routeProvider", function ($routeProvider) {
//Routing
    $routeProvider
        .when("/upload", {
            controller: "uploadCtrl",
            templateUrl: "views/upload.html"
        })
        .when("/result", {
            controller: "processCtrl",
            templateUrl: "views/results.html"
        })
        .otherwise("/upload");
}]);