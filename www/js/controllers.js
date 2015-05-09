


app.controller('passengerDashCtrl', function($scope, $ionicLoading) {

  // $scope.getMyLocation = function(){
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     return position;
  //   });
  // }

  $scope.mapCreated = function(map) {
    $scope.map = map;
  };

  $scope.centerOnMe = function () {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got your location');
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $ionicLoading.hide();
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };
});

// app.controller('passengerSigninCtrl', function($scope, $stateParams, $http) {
//   $scope.data = {}
//   console.log($stateParams)
//   $scope.login = function(){
//     console.log($scope.data);
//     $http.post('http://bike-me.herokuapp.com', data).success(function(data){
//       $location.path("tab.passengerDash")
//       //add service to keep care of current user
//     });
//   }
// })

app.controller('passengerChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
})

app.controller('passengerChatDetailCtrl', function($scope, $stateParams, Chats) {
  // console.log($stateParams)
  $scope.chat = Chats.get($stateParams.chatId);
  // console.log($scope.chat)
})

app.controller('passengerAccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: false
  };
});
