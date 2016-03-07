angular.module('hackoverflow.add-post', [
  'hackoverflow.services',
  'ui.router'
])

.config(function ($stateProvider) {
})

.controller('AddPostController', function ($scope, $rootScope, $state,
  $stateParams, Posts, ForumService, Auth) {
  $scope.title = '';
  $scope.body = '';
  $scope.forums = [];
  $scope.forum = ForumService.currentForum.model.forum;

  Auth.getUser()
    .then(function(response){
        $rootScope.user = response.data.displayName;
    });

  $scope.getForums = function getForums() {
    Posts.getForums().then(function (data) {
      $scope.forums = data.data.sort();
      $scope.forums.unshift('Please choose a forum');
    });
  };
  
  $scope.submit = function () {
    Posts.createPost($scope.title, $scope.body, $scope.forum,
      $rootScope.user, new Date());
    $state.go('posts', { 'forum': $scope.forum });
  };
  
  $scope.getForums();
});
