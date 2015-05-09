app.directive('map', function() {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },
    link: function ($scope, $element, $attr) {
      function initialize() {

        navigator.geolocation.getCurrentPosition(function (position) {
          $scope.position = position;

          var mapOptions = {
            center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: false,
            mapTypeControl: false,
            streetViewControl: false,
          };

          var map = new google.maps.Map($element[0], mapOptions);
          var image = {
            url: "../img/motor-bike-64.png",
          // size: new google.maps.Size(71, 71),
          // origin: new google.maps.Point(0, 0),
          // anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(37, 37)
          };

          var marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            animation: google.maps.Animation.DROP,
            icon: image
          });

          $scope.onCreate({map: map});

          // Stop the side bar from dragging when mousedown/tapdown on the map
          google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
            e.preventDefault();
            return false;
          });
        });
      }

      if (document.readyState === "complete") {
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }
    }
  }
});