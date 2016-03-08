angular.module('hackoverflow.chat', [
    'hackoverflow.services',
    'ui.router'
  ])
  .config(function($stateProvider) {})

.controller('ChatController', function($scope, socket, $state, Auth) {
  $scope.thisUser = Auth.returnUser();
  $scope.msgs = [];

  $scope.sendMsg = function() {
    var messageToSend = {
      user: $scope.thisUser.displayName,
      msg: $scope.msg.text,
      pic: $scope.thisUser.picture
    };
    socket.emit('send msg', messageToSend);
    $scope.msg.text = '';
  };

  socket.on('get msg', function(msg) {
    $scope.msgs.push(msg);
    $scope.$digest();
  });
});
