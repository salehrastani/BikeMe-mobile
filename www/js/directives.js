app.directive('map', function() {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },
    link: function ($scope, $element, $attr, $location) {
      function initializeNavArguments() {

        options = {
          enableHighAccuracy: true,
          timeout: 7000,
          maximumAge: 0
        };

        fail = function(){
          return;
        }

        successCallback = function (showMap) {

          var myLatLng = {lat: showMap.coords.latitude, lng: showMap.coords.longitude};

          var mapOptions = {
            center: myLatLng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: false,
            mapTypeControl: false,
            streetViewControl: false,
          };

          var map = new google.maps.Map($element[0], mapOptions);

          var userIcon = function(){
            var currentUrl = location.hash
            if(currentUrl === "#/driver/dash"){
              return "img/driver-icon-64.png"
            } else {
              return "img/passenger-icon-64.png"
            }
          }

          var myImage = {
            url: userIcon(),
            scaledSize: new google.maps.Size(30, 30)
          };

          var myMarker = new google.maps.Marker({
            map: map,
            position: myLatLng,
            icon: myImage
          });

          $scope.onCreate({map: map});

          // Stop the side bar from dragging when mousedown/tapdown on the map
          google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
            e.preventDefault();
            return false;
          });

        } // successCallback function closes

      } // initializeNavArguments function closes

      function initializeNavMap(){
        navigator.geolocation.watchPosition(successCallback,fail, options);
      }

      if (document.readyState === "complete") {
        initializeNavArguments();
        initializeNavMap()
      } else {
        google.maps.event.addDomListener(window, 'load', initializeNavArguments);
      }

    } // link function closes

  } // return in directive function closes

}); // directive function closes
