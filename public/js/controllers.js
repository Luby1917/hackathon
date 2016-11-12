angular.module('monitorApp.controllers',['ui.bootstrap', 'angularUtils.directives.dirPagination']
).controller('MonitorController',function($scope,$interval, $http){
  $scope.data = [];
  $scope.temps = [[]];

  $http.get("/data")
    .then(function(response) {
        $scope.data = response.data.data;

        for(var i = 0; i<$scope.data.length; i++){
          $scope.temps[0].push($scope.data[i].value);
          $scope.labels.push($scope.data[i].timestamp);
        }



    });
    $scope.labels = [];
     $scope.series = ['Temperaturas'];
     /*$scope.temps = [
       [65, 59, 80, 81, 56, 55, 40]
     ];*/
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
