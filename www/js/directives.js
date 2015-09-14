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

          scope.$on('displayDriversLocations',function(event, data){
            scope.displayDriversLocations(data)
          });

          $scope.clearMarkers = function(markers){
            for(i=0;i<markers.length;i++){
              markers[i].setMap(null);
            }
            $scope.driverMarkers = []
          }

          scope.displayDriversLocations = function(locations){
            console.log("displaydriversLocations has been evoked")
            // first delete all drivers markers; users (whether driver or passenger) will be fine cuz of watcher; then populate markers
            clearMarkers($scope.driverMarkers);
            // $scope.driversMarkers = []
            for (var i=0; i<locations.length; i++){
              var driverLatLng={lat: parseFloat(locations[i][0]) , lng: parseFloat(locations[i][1])}
              $scope.driverMarker = new google.maps.Marker({
                map: map,
                position: driverLatLng,
                icon: {
                  url: "img/driver-icon-64.png",
                  scaledSize: new google.maps.Size(26, 26)
                }
              driversMarkers.push($scope.driverMarker)
              });
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
            myMarker.setPosition(new google.maps.LatLng(position.coords.latitude,position.coords.longitude)); // Display on map
            scope.$parent.map.setCenter(new google.maps.LatLng(position.coords.latitude,position.coords.longitude))
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
