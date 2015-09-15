app.directive('map', function($timeout, $http, $interval) {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },
    link: function (scope, element, attr, $location) {
      function initialize() {

        options = {
          enableHighAccuracy: false,
          timeout: 7000,
          maximumAge: 0
        };

        fail = function(){
         return;
        }

        navigator.geolocation.getCurrentPosition(function (position) {
          console.log("getCurrentPosition function")
          var myLatLng = {lat: position.coords.latitude, lng: position.coords.longitude};
          scope.$parent.sendLocation(myLatLng);

          var mapOptions = {
            center: myLatLng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: false,
            mapTypeControl: false,
            streetViewControl: false,
          };

          var map = new google.maps.Map(element[0], mapOptions);

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
            scaledSize: new google.maps.Size(26, 26)
          };

          var myMarker = new google.maps.Marker({
            map: map,
            position: myLatLng,
            icon: myImage
          });

          var tripRequest = false

          scope.$on('displayTripRequest',function(event, data){
            scope.displayTripRequest(data);
          });

          scope.hashCode = function(s){
            return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
          }


          scope.displayTripRequest = function(trip){
            console.log("displayTripRequest has been evoked")
            console.log(trip[0].origin.lat)
            scope.clearMarkers(driversMarkers);
            var passengerLatLng = {lat: parseFloat(trip[0].origin.lat) , lng: parseFloat(trip[0].origin.lng)}
            new google.maps.Marker({
              map: map,
              position: passengerLatLng,
              icon: {
                url: "img/passenger-icon-64.png",
                scaledSize: new google.maps.Size(26, 26)
              }
            });
          }

          scope.$on('displayDriversLocations',function(event, data){
            scope.displayDriversLocations(data)
          });

          scope.clearMarkers = function(markers){
            for(i=0;i<markers.length;i++){
              markers[i].setMap(null);
            }
          }

          var driversMarkers = []

          scope.displayDriversLocations = function(locations){
            console.log("displaydriversLocations has been evoked")
            scope.clearMarkers(driversMarkers);
            for (var i=0; i<locations.length; i++){
              var driverLatLng={lat: parseFloat(locations[i][0]) , lng: parseFloat(locations[i][1])}
              driversMarkers.push(new google.maps.Marker({
                map: map,
                position: driverLatLng,
                icon: {
                  url: "img/driver-icon-64.png",
                  scaledSize: new google.maps.Size(26, 26)
                }
              }));
            }
          }

          scope.onCreate({map: map});

          // Stop the side bar from dragging when mousedown/tapdown on the map
          google.maps.event.addDomListener(element[0], 'mousedown', function (e) {
            e.preventDefault();
            return false;
          });

          navigator.geolocation.watchPosition(function(position){
            console.log("watchPosition is happening")
            var currentLatLng = {lat: position.coords.latitude, lng: position.coords.longitude}
            scope.$parent.sendLocation(currentLatLng); // send to DB
            myMarker.setPosition(currentLatLng); // Display on map
            scope.map.setCenter(currentLatLng)
          });

        },fail, options) // getCurrentPosition function closes


      } // initialize function closes
      // fire initialize function when the dom and html is ready, else wait till its ready
      if (document.readyState === "complete") {
        initialize()
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }

    } // link function closes

  } // return in map directive function closes

}); // map directive function closes
