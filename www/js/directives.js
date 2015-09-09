app.directive('map', function() {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },
    link: function ($scope, $element, $attr, $location) {
      function initialize() {

        options = {
          enableHighAccuracy: true,
          timeout: 7000,
          maximumAge: 0
        };

        fail = function(){
          return;
        }

        navigator.geolocation.getCurrentPosition(function (position) {

          var myLatLng = {lat: position.coords.latitude, lng: position.coords.longitude};

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

          var driverMarker = new google.maps.Marker({
            map: map,
            position: {lat: 37.865961 , lng: -122.278161},
            icon: {
              url: "img/driver-icon-64.png",
              scaledSize: new google.maps.Size(26, 26)
            }
          });

          $scope.onCreate({map: map});

          // Stop the side bar from dragging when mousedown/tapdown on the map
          google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
            e.preventDefault();
            return false;
          });

          watchCurrentPosition()

        },fail, options) // getCurrentPosition function closes

        watchCurrentPosition = function(){
          navigator.geolocation.watchPosition(function(position){
            myMarker.setPosition(new google.maps.LatLng(position.coords.latitude,position.coords.longitude));
            map.setCenter(new google.maps.LatLng(position.coords.latitude,position.coords.longitude))
          });
        }

      } // initialize function closes

      if (document.readyState === "complete") {
        initialize()
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }

    } // link function closes

  } // return in map directive function closes

}); // map directive function closes
