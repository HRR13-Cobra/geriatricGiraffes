angular.module('hackoverflow.posts', [
  'hackoverflow.services',
  'ui.router'
])

.config(function ($httpProvider, $urlRouterProvider, $stateProvider) {
})

.controller('PostsController', function ($scope, $rootScope, $stateParams, $state, $window, Posts, Comments, TimeService, ForumService, Auth) {
  $scope.posts = [];
  $scope.forums = [];
  $scope.numberOfComments = {};
  $scope.forum = ForumService.currentForum.model.forum;
  $scope.TimeService = TimeService;
   Auth.getUser()
      .then(function(response){
        $rootScope.user = response.data.displayName;
      });

  $scope.getPosts = function getPosts(forum) {
    // TODO: need to pass in forum to Posts.getPosts()
    Posts.getPosts('').then(function (data) {
      $scope.posts = data.data;

      console.log($scope.posts);
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
    Posts.getForums().then(function (data) {
      $scope.forums = data.data.sort();
    });
  };

  $scope.switchForum = function switchForum(forum) {
    $scope.forum = forum;
    ForumService.currentForum.model.forum = forum;
    $scope.getForums();
  };

  $scope.getNumberOfComments = function getNumberOfComments(postId) {
    Comments.getNumberOfComments(postId).then(function (results) {
      $scope.numberOfComments[postId] = results.data;
    });
  };

  //CREATE function that appends each message to the chatbox
  $scope.sendChat = function sendChat(message){
    $("#messages").append($("<li>").text(message))
  }

  $scope.getPosts($scope.forum);
  $scope.getForums();

});
