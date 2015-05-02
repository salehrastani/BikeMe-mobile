

app.controller('passengerSigninCtrl', function($scope, $stateParams, $http) {
  $scope.data = {}
  console.log($stateParams)
  $scope.login = function(){
    console.log($scope.data);
    $http.post('http://bike-me.herokuapp.com', data).success(function(data){
      $location.path("tab.passengerDash")
      //add service to keep care of current user
    });
  }

})

app.controller('passengerDashCtrl', function($scope) {})

app.controller('passengerChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

app.controller('passengerChatDetailCtrl', function($scope, $stateParams, Chats) {
  // console.log($stateParams)
  $scope.chat = Chats.get($stateParams.chatId);
  // console.log($scope.chat)
})

app.controller('passengerAccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: false
  };
});
