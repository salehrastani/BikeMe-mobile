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

app.controller('driverDashCtrl', function($scope, $http, $timeout, $interval, $rootScope, CookieHandler){

  $scope.mapCreated = function(map){
    $scope.map = map;
  };

  $scope.sendLocation = function(mylatlng){
    $scope.currentLocation = mylatlng
    $http.post('https://bike-me.herokuapp.com/drivers/location', mylatlng)
    .success(function(data){
      console.log(data)
    }).error(function(){
      console.log("location data wasnt sent to DB")
    })
  }

  $scope.centerOnMe = function(){
    console.log("centerOnMe")
      $scope.map.setCenter($scope.currentLocation);
  };

  $scope.getDriversLocations = $interval(function(){
    console.log("getDriversLocations interval is digesting")
    $http.get('https://bike-me.herokuapp.com/drivers/locations')
    .success(function(data){
      $scope.driversLocations = data
      if(data.locations){
        console.log(data.locations)
        $rootScope.$broadcast('displayDriversLocations',data.locations);
      }
    }).error(function(){
      console.log('couldnt get all drivers locations from DB')
    })
  }, 2000)



  $scope.watchTrips = $interval(function(){
    console.log("trip watcher interval is digesting")
    $http.get('https://bike-me.herokuapp.com/trips')
    .success(function(data){
      console.log("we are loggin nothing ?????")
      console.log(data)
      if(data){
        console.log("we dont know that its nothing")
        $interval.cancel($scope.getDriversLocations)
        $rootScope.$broadcast('displayTripRequest', data.trips);
        // $interval.cancel($scope.watchTrips)
      }
    }).error(function(data){
      console.log('couldnt get all trips from DB')
    })
  }, 2000)

  $scope.driverActivity = function(params){
    $http.post('https://bike-me.herokuapp.com/drivers/activity', params)
    .success(function(data){
      console.log(data)
    }).error(function(){
      console.log('couldnt activate driver')
    })
  }

  $scope.deActivateDriver = function(){
    $scope.deActivated = false
    $timeout(function() {
      $scope.activated = false
    }, 500);
    $scope.driverActivity({active: false});
  }

  $scope.activateDriver = function(){
    $scope.activated = true
    $timeout(function(){
      $scope.deActivated = true
    }, 500);
    $scope.driverActivity({active: true});
  }

})

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
app.controller('passengerDashCtrl', function($scope, $http, $interval, $rootScope, CookieHandler) {
  console.log("passengers dash controller")

  $scope.sendLocation = function(myLatLng){
    $scope.currentLocation = myLatLng
    $http.post('https://bike-me.herokuapp.com/passengers/location', myLatLng)
    .success(function(data){
      console.log(data)
    }).error(function(){
      // console.log("location data wasnt sent to DB")
    })
  }

  $scope.mapCreated = function(map){
    $scope.map = map;
  };

  $scope.centerOnMe = function(){
    console.log("centerOnMe")
      $scope.map.setCenter($scope.currentLocation);
  };

  $scope.getDriversLocations = $interval(function(){
    console.log("getDriversLocations interval is digesting")
    $http.get('https://bike-me.herokuapp.com/drivers/locations')
    .success(function(data){
      $scope.driversLocations = data.locations
      if(data.locations){
        $rootScope.$broadcast('displayDriversLocations',data.locations);
      }
    }).error(function(){
      console.log('couldnt get all drivers locations from DB')
    })
  }, 5000)

  $scope.requestDriver = function(closestDriversId){
    $scope.passengerId = CookieHandler.get["id"]
    tripDetails = {passenger_id: $scope.passengerId, driver_id: closestDriversId, origin:{lat:$scope.currentLocation.lat,lng:$scope.currentLocation.lng}}
    $http.post("https://bike-me.herokuapp.com/trips", tripDetails)
      .success(function(data){
        console.log(data)
        // go to directive and clear markers and show drivers marker only: scope.clearMarkers(driversMarkers);
      }).error(function(){
    })
  }

  $scope.findClosestDriver= function(drivers, passenger){
    var passengerLat = passenger.lat;
    var passengerLng = passenger.lng;
    var raduisOfEarth = 6371; // radius of earth in km
    var distances = [];
    var closest = -1;
    for( i=0;i<drivers.length; i++ ) {
      var driverLat = drivers[i][0];
      var driverLng = drivers[i][1];
      var distanceLat  = $scope.rad(driverLat - passengerLat);
      var distanceLng = $scope.rad(driverLng - passengerLng);
      var a = Math.sin(distanceLat/2) * Math.sin(distanceLat/2) + Math.cos($scope.rad(passengerLat)) * Math.cos($scope.rad(passengerLat)) * Math.sin(distanceLng/2) * Math.sin(distanceLng/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = raduisOfEarth * c;
      distances[i] = d;
      if ( closest == -1 || d < distances[closest] ) {
          closest = i;
      }
    }
    $scope.requestDriver(drivers[closest][2]);
  }

  $scope.requestRide = function(){
    $scope.findClosestDriver($scope.driversLocations, $scope.currentLocation)
  }

  $scope.rad = function(x){
    return x * Math.PI/180;
  }

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
