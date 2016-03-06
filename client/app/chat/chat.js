angular.module('hackoverflow.chat', [
  'hackoverflow.services',
  'ui.router'
])
.config(function ($stateProvider) {
})

.controller('ChatController', function ($scope, socket, $state){
  $scope.msgs = [];
  $scope.sendMsg = function(){
    socket.emit('send msg', $scope.msg.text);
    $scope.msg.text = '';
  }
  socket.on('get msg', function(msg){
    $scope.msgs.push(msg);

    $scope.$digest();
  })
})