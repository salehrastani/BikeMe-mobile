app.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $urlRouterProvider.otherwise('passenger/signin');

//--------- Passenger Authentication -----------

  $stateProvider

  .state('passengerRegister', {
    url: '/passenger/register',
    templateUrl: 'templates/passenger-register.html',
    controller: "passengerRegisterCtrl"
  })

  .state('passengerSignin', {
    url: '/passenger/signin',
    templateUrl: 'templates/passenger-signin.html',
    controller: 'passengerSigninCtrl'
  })

//--------- Driver Authentication -----------

  .state('driverRegister', {
    url: '/driver/register',
    templateUrl: 'templates/driver-register.html',
    controller: 'driverRegisterCtrl'
  })

  .state('driverSignin', {
    url: '/driver/signin',
    templateUrl: 'templates/driver-signin.html',
    controller: 'driverSigninCtrl'
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

  .state('passenger.account', {
    url: '/account',
    templateUrl: 'templates/passenger-account.html',
    controller: 'passengerAccountCtrl'
  })

  .state('passenger.payments', {
    url: '/account/payments',
    templateUrl: 'templates/passenger-payments.html',
    controller: 'passengerPaymentsCtrl'
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

//------------ Driver Tab ---------------

});
