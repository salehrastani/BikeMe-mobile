
app.controller('DashCtrl', function($scope) {})

app.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

app.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  console.log($stateParams)
  $scope.chat = Chats.get($stateParams.chatId);
  console.log($scope.chat)
})

app.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: false
  };
});
