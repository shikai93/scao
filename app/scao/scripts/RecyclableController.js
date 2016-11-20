angular
  .module('scao')
  .controller('RecyclableController', function ( $timeout, $scope, supersonic ) {
    function returnIndex(){
       supersonic.ui.layers.pop();
    }
    
    supersonic.ui.views.current.whenVisible( function() {

        $timeout(returnIndex, 5000);
    });
  });