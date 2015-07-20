
//-----------------------------------------------
app.controller('passengerRegisterCtrl', function($scope, $http, $location, $window, CookieHandler){
  $scope.newPassenger = function(registrationData){
    console.log(registrationData)
    $http.post('http://localhost:3000/passengers', registrationData)
    .success(function(data){
      CookieHandler.set(data);
      $window.location = "#passenger/dash";
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
      CookieHandler.set(data);
      $window.location = "#passenger/dash";
    })
    .error(function(){
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
app.controller('passengerAccountCtrl', function($scope, $window, $ionicPopup, CookieHandler) {
  $scope.signout = function(){
    CookieHandler.remove()
    $window.location = "#passenger/signin"
  }

  $scope.confirmSignout = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Signout',
      template: 'Are you sure?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        $scope.signout()
      } else {
        console.log('You are not sure');
      }
    });
  };

  $scope.settings = {
    enableFriends: false
  };
});

//-----------------------------------------------
app.controller('passengerChatDetailCtrl', function($scope, $stateParams, Chats) {
  // console.log($stateParams)
  $scope.chat = Chats.get($stateParams.chatId);
  // console.log($scope.chat)
})

//-----------------------------------------------
app.controller('passengerChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
})
