app.controller('frontPageCtrl', function($location, $window, $timeout){

   $timeout(function() {
      $window.location = '#/passenger/signin';
    }, 2000);
})
// ---------------------------------------------
app.controller('driverRegisterCtrl', function($scope, $http, $location, $window, CookieHandler){
  $scope.newDriver = function(registrationData){
    console.log(registrationData)
    $http.post('https://bike-me.herokuapp.com/drivers', registrationData)
    .success(function(data){
      console.log(data)
      CookieHandler.set(data);
      $window.location = "#/driver/dash";
    })
    .error(function(data){
      alert ("Ajax call did not go through!")
    });
  };
})

// -----------------------------------------------

app.controller('driverSigninCtrl', function($scope, $http, $location, $window, CookieHandler){
  $scope.signin = function(signinData){
    $http.post('https://bike-me.herokuapp.com/drivers/login', signinData)
    .success(function(data){
      console.log(data)
      CookieHandler.set(data);
      $window.location = "#/driver/dash";
    })
    .error(function(){
      alert ("You need to register!")
    })
  }
})


// -----------------------------------------------
app.controller('passengerRegisterCtrl', function($scope, $http, $location, $window, CookieHandler){
  $scope.newPassenger = function(registrationData){
    $http.post('https://bike-me.herokuapp.com/passengers', registrationData)
    .success(function(data){
      console.log(data)
      CookieHandler.set(data);
      $window.location = "#/passenger/dash";
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
      $window.location = "#/passenger/dash";
    })
    .error(function(){
      alert ("You need to register!")
    })
  }
})
// ----------------------------------------------

app.controller('driverDashCtrl', function($scope){

  $scope.mapCreated = function(map){
    $scope.map = map;
  };

  $scope.centerOnMe = function(){
    navigator.geolocation.getCurrentPosition(function(pos){
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
    });
  };
});

app.controller('driverAccountCtrl', function($scope, $window, $ionicPopup, CookieHandler) {

  $scope.signout = function(){
    CookieHandler.remove()
    $window.location = "#/driver/signin"
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


app.controller('driverPaymentsCtrl', function($scope, $http, $location, $window, $ionicPopup, $timeout, StripeErrorAlerts){

  $scope.handleStripe = function(status, response){
    if(response.error) {
      if (response["error"]["message"]){
        StripeErrorAlerts.invalidStripeAlert(response["error"]["message"])
      } else {
        StripeErrorAlerts.invalidFormAlert();
      }
    } else {
      var stripeData = {stripe_token: response.id}
      $http.post('https://bike-me.herokuapp.com/drivers/stripe', stripeData)
      .success(function(data){
        console.log(data)
      $window.location = "#/driver/account";
    })
    .error(function(){
      console.log("Stripe token did not reach backend!")
    })
    }
  }
})
//-----------------------------------------------
app.controller('passengerDashCtrl', function($scope, $ionicLoading) {

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
    $window.location = "#/passenger/signin"
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
app.controller('passengerPaymentsCtrl', function($scope, $http, $location, $window, $ionicPopup, $timeout, StripeErrorAlerts){

  $scope.handleStripe = function(status, response){
    if(response.error) {
      if (response["error"]["message"]){
        StripeErrorAlerts.invalidStripeAlert(response["error"]["message"])
      } else {
        StripeErrorAlerts.invalidFormAlert();
      }
    } else {
      var stripeData = {stripe_token: response.id}
      $http.post('https://bike-me.herokuapp.com/passengers/stripe', stripeData)
      .success(function(data){
        console.log(data)
        $window.location = "#/passenger/account";
      })
      .error(function(){
        console.log("Stripe token did not reach backend!")
      })
    }
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
