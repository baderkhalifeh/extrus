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
})
.controller('mainCtrl', function ($scope, $mdDialog, $mdMedia,Users) {
  $scope.status = '  ';
  $scope.data = {};
  $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

  // initalize function to get all the users from the database
  $scope.initalize = function(){
    Users.getAll()
    .then(function(users){
      $scope.data.users = users;
    })
    .catch(function (error) {
      console.error(error);
    });
  };

  // function to show a single profile in a pop-up upon clicking on a profile pic
  $scope.showProfile = function(ev,user) {
    // defining the size of the pop-up to make it responsive
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

    // showing the pop-up and giving the handling to the profileViewController
    $mdDialog.show({
      controller: 'profileViewController',
      templateUrl: 'app/profile/profileView.html',
      parent: angular.element(document.body),
      // sending the user as a parameter to the profileEditController
      locals:{
      	user: user
      },
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      // if the user chose to edit the profile he/she
      // will be redirected to another pop-up for editing the info.
      if(answer === 'Edit'){
        $scope.editProfile(ev,user,$mdDialog);
      }
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });

    // watching the changes on the window size to modify it instantly
    // to be responsive
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });

  };

  $scope.editProfile = function(ev,user,parent) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: 'profileEditController',
      templateUrl: 'app/profile/profileEdit.html',
      parent: angular.element(document.body),
      // sending the user as a parameter to the profileEditController
      locals:{
        user: user
      },
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(user) {

      $scope.showProfile(ev,user);

    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });

    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };

  $scope.initalize();

});
