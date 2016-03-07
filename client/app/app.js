angular.module('hackoverflow', [
  'hackoverflow.chat',
  'hackoverflow.profile',
  'hackoverflow.services',
  'hackoverflow.posts',
  'hackoverflow.postsChart',
  'hackoverflow.add-post',
  'hackoverflow.edit-post',
  'hackoverflow.comments',
  'ui.router',
  'ngRoute',
  'ngSanitize',
  'satellizer',
  'hackoverflow.auth'
])

.run(function($rootScope, $auth) {

  $rootScope.$on("$routeChangeStart",
    function (event, next, current) {

    if (sessionStorage.restorestate == "true") {

      //let everything know we need to restore state
      $rootScope.$broadcast('restorestate');
      sessionStorage.restorestate = false;
    }
  });

  //let everthing know that we need to save state now.
  window.onbeforeunload = function (event) {
    $rootScope.$broadcast('savestate');
  };
})

// .controller('AppController', function($scope, $location, $auth) {

//   // this ensures that application fully reboots and
//   // defaults to main page if user reloads a page.
//   $location.path("/");
// })

.config(function($httpProvider, $urlRouterProvider,
$stateProvider, $locationProvider, $authProvider) {

$authProvider.github({
  clientId: '379777b89264293ccc3c'
});

// $locationProvider.html5Mode(true);

$urlRouterProvider.otherwise('signin');
$stateProvider
  .state('profile', {
    params:{'user':null},
    url: '/profile/',
    templateUrl: 'app/users/profile.html',
    controller: 'UserController',
  }) 
  .state('posts', {
    params: {'forum': 'Angular'},
    url: '/',
    templateUrl: 'app/posts/posts.html',
    controller: 'PostsController'
  })
  .state('posts.chat', {
    params: {'forum': 'Angular'},
    url: '/:chat',
    templateUrl: 'app/posts/posts.chat.html',
    controller: 'ChatController'
  })
  .state('add-post', {
    url: '/add-post',
    templateUrl: 'app/posts/add-post.html',
    controller: 'AddPostController'
  })
  .state('edit-post', {
    params: {'post': null},
    url: '/edit-post',
    templateUrl: 'app/posts/add-post.html',
    controller: 'EditPostController'
  })
  .state('comments', {
    params: {'post': null},
    url: '/comments',
    templateUrl: 'app/comments/comments.html',
    controller: 'ChatController'
  })
  .state('signin', {
    url: '/signin',
    templateUrl: 'app/auth/signin.html',
    controller: 'AuthController'
  })
});
