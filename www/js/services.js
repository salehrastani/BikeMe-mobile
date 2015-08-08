app.factory('SessionInjector', function(CookieHandler){
  return {
    request: function(config) {
      if (CookieHandler.get() !== undefined) {
        config.headers['token'] = CookieHandler.get().token;
        config.headers['email'] = CookieHandler.get().email;
      }
      return config;
    }
  }
})

// ----------------------------------------------------
app.factory('CookieHandler', function($cookies, ipCookie){

  var user = null;
  var CookieHandler = {
      set: function(user){
          $cookies['currentUser'] =  user;
      },
      get: function(){
          var getCookie = $cookies['currentUser'];
          return getCookie
      },
      remove: function(user){
          ipCookie.remove('currentUser');
      }
  };
  return CookieHandler;
});

// -------------------------------------------------------

app.factory('StripeErrorAlerts', function($ionicPopup, $timeout){

 var StripeErrorAlerts = {
    invalidFormAlert: function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Invalid Card',
        template: 'Enter a valid card number!'
      });
      alertPopup.then(function(res) {
      });
      $timeout(function() {
        alertPopup.close();
      }, 2000);
    },

    invalidStripeAlert: function(message) {
      var alertPopup = $ionicPopup.alert({
        title: 'Invalid Credentials',
        template: message
      });
      alertPopup.then(function(res) {
      });
      $timeout(function() {
        alertPopup.close();
      }, 2500);
    }
  }

  return StripeErrorAlerts;

})

// ------------------------------------------------------
app.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
