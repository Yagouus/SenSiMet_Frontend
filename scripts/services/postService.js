angular.module("project").service("postService", ["$http", function ($http) {

    this.post = function (uploadUrl, data) {

        var config = {
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        };

        var fd = new FormData();
        fd.append('file', data);

        return $http.post(uploadUrl, fd, config)
    };

    this.postData = function (uploadUrl, s1, s2) {

        var config = {
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        };

        var fd = new FormData();
        fd.append('s1', s1);
        fd.append('s2', s2);

        return $http.post(uploadUrl, fd, config)
    };

    this.getData = function (uploadUrl, s1, s2) {

        var config = {
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        };


        return $http.get(uploadUrl + "?s1=" + s1 + "&s2=" + s2);
    };


    this.data = '';

}]);