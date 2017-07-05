angular.module("project").controller("processCtrl", ["$scope", "$http", 'restService', 'postService', 'spinnerService', '$sce', function ($scope, $http, restService, postService, spinnerService, $sce) {

    //--------MATERIALIZE--------//
    $('.modal').modal();
    $('select').material_select();

    //Get data from service
    $scope.data = postService.data;
    $scope.s1 = postService.data.s1;
    $scope.s2 = postService.data.s2;

    console.log($scope.data);


    //Create a network
    $scope.nodeId = 1; //Node id
    $scope.nodes = new vis.DataSet([]); //Create an array with nodes
    $scope.edges = new vis.DataSet([]);  // create an array with edges
    $scope.selectedNode = 0;   //Id of the node clicked

    var container = document.getElementById('mynetwork');
    var data = {
        nodes: $scope.nodes,
        edges: $scope.edges
    };
    var options = {
        layout: {
            hierarchical: {
                direction: "UD"
            }
        }
    };
    $scope.network = new vis.Network(container, data, options);

    //Populate nodes with sentence terms
    for (var i = 0; i < $scope.data.s1.terms.length; i++) {

        console.log($scope.data.s1.terms[i].pos);

        $scope.nodes.add({
            'id': $scope.data.s1.terms[i].string + 's1',
            'label': $scope.data.s1.terms[i].string,
            'item': $scope.data.s1.terms[i],
            'level': 0,
            'color': '#B2B2B2'
        });

        if ($scope.data.s1.terms[i].pos != null) {
            $scope.nodes.update({
                id: $scope.data.s1.terms[i].string + 's1',
                color : '#1E8EF6'
            });
        }

    }
    for (var i = 0; i < $scope.data.s2.terms.length; i++) {

        console.log($scope.data.s2.terms[i].pos);

        $scope.nodes.add({
            'id': $scope.data.s2.terms[i].string + 's2',
            'label': $scope.data.s2.terms[i].string,
            'item': $scope.data.s2.terms[i],
            'level': 1,
            'color': '#B2B2B2'
        });

        if ($scope.data.s2.terms[i].pos != null) {
            $scope.nodes.update({
                id: $scope.data.s2.terms[i].string + 's2',
                color : '#1E8EF6'
            });
        }
    }


    //Create relations
    for (var i = 0; i < $scope.data.relationsArrayList.length; i++) {
        $scope.edges.add({
            from: $scope.data.relationsArrayList[i].t1.string + 's1',
            to: $scope.data.relationsArrayList[i].t2.string + 's2',
            relation: $scope.data.relationsArrayList[i]
        });
        console.log($scope.edges);
    }

    //On node click
    $scope.network.on('click', function (properties) {
        //Click on edge
        if (properties.nodes.length == 0) {
            var ids = properties.edges;
            console.log($scope.edges.get(ids[0]));
            console.log($scope.nodes.get($scope.relation.from.item));
            console.log($scope.node2 = $scope.nodes.get($scope.relation.to.item));
            $scope.relation = $scope.edges.get(ids[0]).relation;
            $scope.node1 = $scope.nodes.get($scope.relation.from).item;
            $scope.node2 = $scope.nodes.get($scope.relation.to).item;
            $('#viewRelation').modal('open');
        } else {
            console.log(properties);
            var ids = properties.nodes;
            $scope.selectedNode = ids[0];
            console.log($scope.nodes.get($scope.selectedNode));
            //console.log($scope.nodes.get($scope.selectedNode).item);
            $scope.link = $sce.trustAsResourceUrl("http://babelnet.org/synset?word=" + $scope.nodes.get($scope.selectedNode).item.bfy.babelSynsetID + "&lang=EN");

            restService.getSynsetWithID($scope.nodes.get($scope.selectedNode).item.bfy.babelSynsetID)

            //If everything goes right
                .then(function success(response) {
                    $scope.synset = response.data;

                }, function error(response) {
                    swal('Dang!', 'An error ocurred :(', 'error');
                });

            $('#editModal').modal('open');
        }
    });


}]);




