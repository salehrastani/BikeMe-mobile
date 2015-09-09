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

          var mapOptions = {
            center: new google.maps.LatLng(showMap.coords.latitude, showMap.coords.longitude),
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

          var image = {
            url: userIcon(),
            scaledSize: new google.maps.Size(30, 30)
            // size: new google.maps.Size(71, 71),
            // origin: new google.maps.Point(0, 0),
            // anchor: new google.maps.Point(17, 34),
          };

          var marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(showMap.coords.latitude, showMap.coords.longitude),
            icon: image
          });

          $scope.onCreate({map: map});

          // Stop the side bar from dragging when mousedown/tapdown on the map
          google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
            e.preventDefault();
            return false;
          });

        }

      }

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

}); // app.directive function closes
