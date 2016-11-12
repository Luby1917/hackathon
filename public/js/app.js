angular.module('monitorApp',['ui.router',
                              'ui.bootstrap',
                              'ngResource',
                              'ngRoute',
                              'chart.js',
                              'monitorApp.controllers'
                              ]);

angular.module('monitorApp').config(function($stateProvider,$routeProvider, $urlRouterProvider){

    $stateProvider
      .state('monitor',{
        url:'/monitor',
        templateUrl:'partials/monitor.html',
        controller:'MonitorController'
    });
    $urlRouterProvider.otherwise("/monitor");
}).run(function($state){
   $state.go('monitor');
});
