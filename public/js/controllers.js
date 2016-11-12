angular.module('monitorApp.controllers',['ui.bootstrap', 'angularUtils.directives.dirPagination']
).controller('MonitorController',function($scope,$interval, $http){
  $scope.data = [];
  $scope.temps = [[]];

  $scope.lastData = {};

  $http.get("/data")
    .then(function(response) {
        $scope.data = response.data.data;
        $scope.lastData = $scope.data[0];
        for(var i = 0; i<$scope.data.length; i++){
          $scope.temps[0].push($scope.data[i].value);
          $scope.labels.push($scope.data[i].timestamp);
        }
        console.log($scope.labels);
        $scope.temps[0].reverse();
        $scope.labels.reverse();
        console.log($scope.labels);

    });
    $scope.labels = [];
     $scope.series = ['Temperatura'];

     $scope.onClick = function (points, evt) {
       console.log(points, evt);
     };
     $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
     $scope.options = {
       scales: {
         yAxes: [
           {
             id: 'y-axis-1',
             type: 'linear',
             display: true,
             position: 'left'
           }
         ]
       }
     };




});
