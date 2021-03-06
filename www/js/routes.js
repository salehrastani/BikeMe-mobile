app.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
// ---------- General ------------------
  // $urlRouterProvider.otherwise('passenger/signin');

  $stateProvider

  .state('frontPage', {
    url: '',
    templateUrl: 'templates/front-page.html',
    controller: 'frontPageCtrl'
  })


//--------- Driver Authentication -----------

  .state('driverRegister', {
    url: '/driver/register',
    templateUrl: 'templates/driver/driver-register.html',
    controller: 'driverRegisterCtrl'
  })

  .state('driverSignin', {
    url: '/driver/signin',
    templateUrl: 'templates/driver/driver-signin.html',
    controller: 'driverSigninCtrl'
  })

// ----------- Driver Tabs --------------
// This route is the parent driver tabs route
  .state('driver', {
    url: "/driver",
    abstract: true,
    templateUrl: "templates/driver/driver-tabs.html"
  })

  .state('driver.dash', {
    url: '/dash',
    templateUrl: 'templates/driver/driver-dash.html',
    controller: 'driverDashCtrl'
  })

  .state('driver.payments', {
    url: '/account/payments',
    templateUrl: 'templates/driver/driver-payments.html',
    controller: 'driverPaymentsCtrl'
  })

  .state('driver.account', {
    url: '/account',
    templateUrl: 'templates/driver/driver-account.html',
    controller: 'driverAccountCtrl'
  })

//--------- Passenger Authentication -----------

  .state('passengerRegister', {
    url: '/passenger/register',
    templateUrl: 'templates/passenger/passenger-register.html',
    controller: "passengerRegisterCtrl"
  })

  .state('passengerSignin', {
    url: '/passenger/signin',
    templateUrl: 'templates/passenger/passenger-signin.html',
    controller: 'passengerSigninCtrl'
  })

//------------ Passenger Tabs ---------------

// This route is the parent passenger tabs route
  .state('passenger', {
    url: "/passenger",
    abstract: true,
    templateUrl: "templates/passenger/passenger-tabs.html"
  })

  .state('passenger.dash', {
    url: '/dash',
    templateUrl: 'templates/passenger/passenger-dash.html',
    controller: 'passengerDashCtrl'
  })

  .state('passenger.account', {
    url: '/account',
    templateUrl: 'templates/passenger/passenger-account.html',
    controller: 'passengerAccountCtrl'
  })

  .state('passenger.payments', {
    url: '/account/payments',
    templateUrl: 'templates/passenger/passenger-payments.html',
    controller: 'passengerPaymentsCtrl'
  })

  .state('passenger.chats', {
    url: '/chats',
    templateUrl: 'templates/passenger/passenger-chats.html',
    controller: 'passengerChatsCtrl'
  })

  .state('passenger.chat-detail', {
    url: '/chats/:chatId',
    templateUrl: 'templates/passenger/passenger-chat-detail.html',
    controller: 'passengerChatDetailCtrl'
  })



// ------------- Ending curly braces for <app.config>
});
