angular.module('hackoverflow.posts', [
  'hackoverflow.services',
  'ui.router'
])

.controller('PostsController', function($scope, $stateParams, $state, Posts, Comments, TimeService, ForumService, $rootScope) {
  $scope.posts = [];
  $scope.forums = [];
  $scope.numberOfComments = {};
  $scope.forum = ForumService.currentForum.model.forum;
  $scope.TimeService = TimeService;

  $scope.getPosts = function getPosts(forum) {
    // TODO: need to pass in forum to Posts.getPosts()
    Posts.getPosts('').then(function(data) {
      $scope.posts = data.data;
      // this creates an object $scope.numberOfComments that
      // keeps track of each posts number of comments. not
      // ideal, but works. need to refactor how we go
      // about determining the number of comments.
      for (var i = 0; i < $scope.posts.length; i++) {
        $scope.posts[i].numberOfComments = $scope.getNumberOfComments($scope.posts[i]._id);
      }
    });
  };

  $scope.getForums = function getForums(forum) {
    Posts.getForums().then(function(data) {
      $scope.forums = data.data.sort();
    });
  };

  $scope.switchForum = function switchForum(forum) {
    $scope.forum = forum;
    ForumService.currentForum.model.forum = forum;
    $scope.getForums();
  };

  $scope.getNumberOfComments = function getNumberOfComments(postId) {
    Comments.getNumberOfComments(postId).then(function(data) {
      $scope.numberOfComments[postId] = data.data;
    });
  };

  $scope.getPosts($scope.forum);
  $scope.getForums();

  //http://stackoverflow.com/questions/27853431/ion-list-does-not-refresh-after-state-go-is-called
  $rootScope.$on('addedNewPost', function() {
    console.log('I\'m listening');
    $scope.getPosts($scope.forum);
  });
});
