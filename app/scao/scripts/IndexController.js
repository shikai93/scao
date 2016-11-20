angular
  .module('scao')
  .controller('IndexController', function ( $q, $scope, supersonic ) {
    
    var promises = [];
    var recyclable = false;
                
    //var Clarifai = require('clarifai');
    var app = new Clarifai.App(
        '-kJkjcvdqlynN1-cWy4rZwOdztrOwc_vt5QAd5RF',
        'hmS1WDSfn2W4d35Mh1sR1l8N9e_eRsb0OVMvfkd_'
    );
    
    supersonic.ui.views.current.whenVisible( function() {
      document.getElementById('listingImg').src = 'http://iconshow.me/media/images/Application/Modern-Flat-style-Icons/png/512/Camera.png';
    });
      
    $scope.updateImg = function() {
      
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
         destinationType: Camera.DestinationType.DATA_URL
      });
    };
    
    function showRecyclable () {
      
      var view;
      if (recyclable) {
        view = new supersonic.ui.View("scao#recyclable");
      } else {
        view = new supersonic.ui.View("scao#non-recyclable");
      }
      supersonic.ui.layers.push(view);
    }
   
   function onSuccess(imageData) {
    
      var imageHTML = document.getElementById('listingImg');
      imageHTML.src = "data:image/jpeg;base64," + imageData;

      app.models.predict('b9f4b8160f9747cb8e11df787d77a5e5', {base64 : imageData}).then(
        function(response){
            recyclable = false;
            promises = [];
            var concept = response.data.outputs[0].data.concepts[0];
            supersonic.logger.debug(concept);
            if (concept.name.split(' ')[0] == 'recyclable') {
                recyclable = true;
                promises.push(concept.name.split(' ')[1]);
            }
            showRecyclable();
            },
        function(err){
            supersonic.logger.debug('error');
            alert(err);
        });
  }

   function onFail(message) {
    
    supersonic.logger.debug(message);
   }
  });