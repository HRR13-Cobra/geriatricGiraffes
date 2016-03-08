angular.module('hackoverflow.auth', [
  'hackoverflow.services',
  'satellizer'
])

// .config(function($stateProvider) {})

.controller('AuthController',
  function($scope, $rootScope, $auth, $state, Auth, $ionicPopup) {

    $scope.authenticate = function(provider) {
      $auth.logout();
      $auth.authenticate(provider)
        .then(function(response) {
          Auth.getUser()
            .then(function(response) {
              $rootScope.user = response.data.displayName;
              $state.go('tab.posts');
            });
        })
        .catch(function(response) {
          console.log(response);
          $ionicPopup.alert({
            title: 'Error',
            content: response.data ? response.data || response.data.message : response
          });
        });
    };
  });
