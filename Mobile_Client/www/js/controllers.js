angular.module('starter.controllers', ['hackoverflow.auth'])

.controller('AccountCtrl', function($scope, Auth, $state) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.user = Auth.returnUser();

  $scope.logout = function() {
    $state.go('signin', null, {
      reload: true
    });
  };

});
