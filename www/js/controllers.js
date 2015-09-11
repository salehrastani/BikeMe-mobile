app.controller('frontPageCtrl', function($location, $window, $timeout){

   $timeout(function() {
      $window.location = '#/passenger/signin';
    }, 3500);
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

app.controller('driverDashCtrl', function($scope, $http){

  $scope.mapCreated = function(map){
    $scope.map = map;
  };

  $scope.sendLocation = function(mylatlng){
    $http.post('http://bike-me.herokuapp.com/drivers/location', mylatlng)
    .success(function(data){
      console.log(data)
    }).error(function(){
      console.log("location data wasnt sent to DB")
    })
  }

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
app.controller('passengerDashCtrl', function($scope, $http) {
  console.log("passengers dash controller")

  $scope.sendLocation = function(mylatlng){
    $http.post('http://bike-me.herokuapp.com/passengers/location', mylatlng)
    .success(function(data){
      console.log(data)
    }).error(function(){
      console.log("location data wasnt sent to DB")
    })
  }

  $scope.mapCreated = function(map){
    $scope.map = map;
  };

  $scope.centerOnMe = function(map){
    console.log("in centerOnMe")
    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log("in getCurrentPosition")
      map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
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
