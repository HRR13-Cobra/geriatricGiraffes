angular.module('hackoverflow.chat', [
  'hackoverflow.services',
  'ui.router'
])
.config(function ($stateProvider) {
})

.controller('ChatController', function ($scope, Socket, $state){
  $scope.msgs = [];
  $scope.sendMsg = function(){
    Socket.emit('send msg', $scope.msg.text);
  }
  Socket.on('get mgs', function(data){
    $scope.msgs(data);
    $scope.$digest();
  })
})