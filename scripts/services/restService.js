angular.module("project").service("restService", ["$http", function($http){

    this.get = function(url, service){
        return $http.get(url + service);
    };

    this.getSynsetWithID = function(synsetID){
        return $http.get("https://babelnet.io/v4/getSynset?id=" + synsetID + "&key=1e545625-7f8d-44be-a678-140b25965229")
    };

    //this.url = 'http://localhost:8080';
    //this.url = 'http://tec.citius.usc.es/sensimet-backend'
    this.url = 'http://172.16.244.168:8081'

}]);