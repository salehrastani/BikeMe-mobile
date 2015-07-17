app.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $urlRouterProvider.otherwise('passenger/login');

//--------- Passenger Authentication -----------

  $stateProvider

  .state('passengerRegister', {
    url: '/passenger/register',
    templateUrl: 'templates/passenger-register.html',
    controller: "passengerRegisterCtrl"
  })

  .state('passengerLogin', {
    url: '/passenger/login',
    templateUrl: 'templates/passenger-login.html',
    // controller: 'passengerSigninCtrl'
  })

//--------- Driver Authentication -----------

  .state('driverLogin', {
    url: '/driver/login',
    templateUrl: 'templates/driver-login.html'
  })

  .state('driverRegister', {
    url: '/driver/register',
    templateUrl: 'templates/driver-register.html'
  })

//------------ Passenger Tab ---------------

// This route is the parent passenger tabs route
  .state('passenger', {
    url: "/passenger",
    abstract: true,
    templateUrl: "templates/passenger-tabs.html"
  })


  .state('passenger.dash', {
    url: '/dash',
    templateUrl: 'templates/passenger-dash.html',
    controller: 'passengerDashCtrl'
  })

  .state('passenger.chats', {
    url: '/chats',
    templateUrl: 'templates/passenger-chats.html',
    controller: 'passengerChatsCtrl'
  })

  .state('passenger.chat-detail', {
    url: '/chats/:chatId',
    templateUrl: 'templates/passenger-chat-detail.html',
    controller: 'passengerChatDetailCtrl'
  })

  .state('passenger.account', {
    url: '/account',
    templateUrl: 'templates/passenger-account.html',
    controller: 'passengerAccountCtrl'
  })

});


//------------ Driver Tab ---------------
