// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'hackoverflow.chat', 'hackoverflow.services',
  'hackoverflow.posts',
  'hackoverflow.add-post',
  'hackoverflow.edit-post',
  'hackoverflow.comments',
  'hackoverflow.profile',
  'ui.router',
  'ngSanitize',
  'hackoverflow.auth',
  'satellizer'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $authProvider) {

  $authProvider.github({
    clientId: '312af5a4505a304e2d29',
    url: 'http://hackoverflow2.herokuapp.com/auth/github'
  });

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('signin', {
    url: '/signin',
    templateUrl: 'js/auth/signin.html',
    controller: 'AuthController'
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
  .state('tab.posts', {
      params: {
        'forum': 'Angular'
      },
      url: '/posts',
      // cache: false,
      views: {
        'tab-posts': {
          templateUrl: 'js/posts/posts.html',
          controller: 'PostsController'
        }
      }
    })
    .state('tab.posts-add-post', {
      url: '/add-post',
      views: {
        'tab-posts': {
          templateUrl: 'js/posts/add-post.html',
          controller: 'AddPostController'
        }
      }
    })
    .state('tab.posts-edit-post', {
      params: {
        'post': null
      },
      url: '/edit-post',
      views: {
        'tab-posts': {
          templateUrl: 'js/posts/add-post.html',
          controller: 'EditPostController'
        }
      }
    })
    .state('tab.posts-comments', {
      params: {
        'post': null
      },
      url: '/comments',
      views: {
        'tab-posts': {
          templateUrl: 'js/comments/comments.html',
          controller: 'CommentsController'
        }
      }
    })
    .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'js/chat/chat.html',
          controller: 'ChatController'
        }
      }
    })
    .state('tab.account', {
      url: '/account',
      // cache: false,
      views: {
        'tab-account': {
          templateUrl: 'js/users/profile.html',
          controller: 'UserController'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/tab/posts');
  $urlRouterProvider.otherwise('/signin');

});
