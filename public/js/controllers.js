angular.module('monitorApp.controllers',['ui.bootstrap', 'angularUtils.directives.dirPagination']
).controller('MonitorController',function($scope,$interval, $http){
  $scope.data = [];
  $scope.temps = [[]];

  $scope.lastData = {};
  $scope.refreshTime = 0.1;

  $scope.getData = function(){
    $http.get("/data")
      .then(function(response) {

          $scope.data = response.data.data;
          $scope.lastData = $scope.data[0];

          $scope.temps = [[]];
          $scope.labels = [];

          for(var i = 0; i<10/*$scope.data.length*/; i++){
            $scope.temps[0].push($scope.data[i].value);
            var time = $scope.data[i].timestamp.substring(10, 20);
            $scope.labels.push(time);
          }

          $scope.temps[0].reverse();
          $scope.labels.reverse();



          /*
          var oldLength = $scope.temps[0].length;
          var newLength = $scope.data.length;

          console.log("OLD",oldLength);
          console.log("NEW",newLength);

          if(oldLength<newLength){
            console.log("DATOS NUEVOS");
            //var diffLength = newLength - oldLength;
            for(var i = oldLength; i<$scope.data.length; i++){
              $scope.temps[0].push($scope.data[i].value);
              var time = $scope.data[i].timestamp.substring(10, 20);
              $scope.labels.push(time);
            }
          }
          */
          /*else{

            for(var i = 0; i<$scope.data.length; i++){
              $scope.temps[0].push($scope.data[i].value);
              $scope.labels.push($scope.data[i].timestamp);
            }
            //console.log($scope.labels);
            //$scope.temps[0].reverse();
            //$scope.labels.reverse();
            //console.log($scope.labels);
          }*/

      });
    }

  $scope.getData();
  $interval( function(){ $scope.getData();}, 6*1000);


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
