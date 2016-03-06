angular.module('hackoverflow', [
  'hackoverflow.chat',
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

<<<<<<< HEAD
.controller('AppController', function($scope, $location, $auth) {
  // this ensures that application fully reboots and
  // defaults to main page if user reloads a page.
  $location.path("/");
})
=======
// .controller('AppController', function($scope, $location, $auth) {

//   // this ensures that application fully reboots and
//   // defaults to main page if user reloads a page.
//   $location.path("/");
// })
>>>>>>> staging

.config(function($httpProvider, $urlRouterProvider,
$stateProvider, $locationProvider, $authProvider) {

<<<<<<< HEAD
  $authProvider.github({
    clientId: '379777b89264293ccc3c'
  });
=======
$authProvider.github({
  clientId: '379777b89264293ccc3c'
});
>>>>>>> staging

// $locationProvider.html5Mode(true);

<<<<<<< HEAD
  $urlRouterProvider.otherwise('signin');
  $stateProvider
    .state('posts', {
      params: {'forum': 'Angular'},
      // url: '/',
      templateUrl: 'app/posts/posts.html',
      controller: 'PostsController'
    })
    .state('add-post', {
      // url: '/add-post',
      templateUrl: 'app/posts/add-post.html',
      controller: 'AddPostController'
    })
    .state('edit-post', {
      params: {'post': null},
      // url: '/edit-post',
      templateUrl: 'app/posts/add-post.html',
      controller: 'EditPostController'
    })
    .state('comments', {
      params: {'post': null},
      // url: '/comments',
      templateUrl: 'app/comments/comments.html',
      controller: 'CommentsController'
    })
    .state('signin', {
      url: '/',
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .state('signup', {
      // url: '/signup',
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    .state('user', {
      url: '/userprofile',
      templateUrl: 'app/user/user.html',
      controller: 'UserController'
    })
=======
$urlRouterProvider.otherwise('signin');
$stateProvider
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
>>>>>>> staging
});
