
//-----------------------------------------------
app.controller('passengerRegisterCtrl', function($scope, $http, $location, $window, CookieHandler){
  $scope.newPassenger = function(registrationData){
    $http.post('https://bike-me.herokuapp.com/passengers', registrationData)
    .success(function(data){
      console.log(data)
      CookieHandler.set(data);
      $window.location = "#passenger/dash";
    })
    .error(function(){
      alert ("Ajax call did not go through!")
    });
  };
})

// ----------------------------------------------
app.controller('passengerSigninCtrl', function($scope, $http, $location, $window, CookieHandler){
  $scope.signin = function(signinData){
    $http.post('https://bike-me.herokuapp.com/passengers/login', signinData)
    .success(function(data){
      console.log(data)
      CookieHandler.set(data);
      $window.location = "#passenger/dash";
    })
    .error(function(){
      alert ("Ajax call did not go through!")
    })
  }
})

//-----------------------------------------------
app.controller('passengerDashCtrl', function($scope, $ionicLoading, CookieHandler) {

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

// ---------------------------------------------
app.controller('passengerPaymentsCtrl', function($scope, $http, $location, $window, $ionicPopup, $timeout){

  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Invalid Card',
      template: 'Please Enter a Valid Card!'
    });
    alertPopup.then(function(res) {
    });
    $timeout(function() {
      alertPopup.close();
    }, 2000);
  };

  $scope.addPayment = function(cardData){
    console.log("we are in the addPayment function")
    console.log(cardData)
  }
})

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
