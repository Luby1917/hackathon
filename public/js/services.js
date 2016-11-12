angular.module('monitorApp.services',[]).factory('Node',function($resource,$location){
    return $resource($location.absUrl().split("#")[0] + 'api/data',{id:'@'},{
        update: {
          method: 'PUT'
        }
    });
}).service('commandService',function($http, $q, $location){
  return ({
    executeCommand:executeCommand
  });
  function executeCommand(command, node_id){

    var request = $http.post($location.absUrl().split("#")[0] + 'api/commands/'+node_id, {command:command});
    return( request.then( handleSuccess, handleError ) );
  }
  //PRIVATE METHODS
  function handleError( response ) {
    if (
        ! angular.isObject( response.data ) ||
        ! response.data.message
        ) {
        return( $q.reject( "An unknown error occurred." ) );
    }
    return( $q.reject( response.data.message ) );
  }
  function handleSuccess( response ) {
    return( response.data );
  }
});
