angular.module('hackoverflow.chat', [
  'hackoverflow.services',
  'ui.router'
])

.controller('ChatController', function($scope, socket, $ionicScrollDelegate, Auth, $state) {
  $scope.user = Auth.returnUser();

  $scope.msgs = [];
  $scope.text = '';

  $scope.sendMsg = function(msg) {
    // greatest line of code ever written
    $scope.$$childTail.text = null;
    // sends message to server
    socket.emit('send msg', msg);
  };
  // client receives message from server
  socket.on('get msg', function(msg) {
    $scope.msgs.push(msg);
    if ($state.is('tab.chats')) {
      $ionicScrollDelegate.scrollBottom();
    }
    $scope.$digest();
  });
});
