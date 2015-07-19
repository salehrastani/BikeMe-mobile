
//-----------------------------------------------
app.controller('passengerRegisterCtrl', function($scope, $http, $location, $window, CookieHandler){
  $scope.newPassenger = function(registrationData){
    console.log(registrationData)
    $http.post('http://localhost:3000/passengers', registrationData)
      .success(function(data){
        CookieHandler.set(data);
        // $window.location = "#passenger/photo";
    })
      .error(function(){
    });
  };
})

// ----------------------------------------------
app.controller('passengerSigninCtrl', function($scope, $http, $location, $window, CookieHandler){
  $scope.signin = function(signinData){
    console.log(signinData);
    $http.post('http://localhost:3000/passengers/login', signinData)
    .success(function(data){
      console.log(data)
      // CookieHandler.set(data);
      // $window.location = "#passenger/photo";
    })
  }
})

//-----------------------------------------------
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

//-----------------------------------------------
app.controller('passengerChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
})

//-----------------------------------------------
app.controller('passengerChatDetailCtrl', function($scope, $stateParams, Chats) {
  // console.log($stateParams)
  $scope.chat = Chats.get($stateParams.chatId);
  // console.log($scope.chat)
})

//-----------------------------------------------
app.controller('passengerAccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: false
  };
});
