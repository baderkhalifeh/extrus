angular.module('RBKme', [
  'RBKme.services',
  'RBKme.blog',
  'RBKme.profileView',
  'RBKme.profileEdit',
  'RBKme.home',
  'RBKme.d3',
  'RBKme.auth',
  'ngRoute',
  'ngMaterial',
  'ngAnimate'
])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/home/home.html',
      controller: 'HomeController'
    })
    .when('/blogs', {
      templateUrl: 'app/blog/blog.html',
      controller: 'BlogController',
    })
    .otherwise({
      redirectTo: '/'
    });
    
    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
    $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.shortly');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
});