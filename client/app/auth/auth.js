angular.module('RBKme.auth', [])

.controller('AuthController', function ($scope, $window, $location, $mdDialog, $mdMedia, Auth) {
  
  $window.username = '';

  $scope.user = {};

  // A flag to check if inputs filled or not
  $scope.filled = true;

  $scope.signin = function () {

    	$scope.filled = true;

    	if(!$scope.user.username || !$scope.user.password){
        $scope.filled = false;
        $scope.user.username = '';
        $scope.user.password = '';
        $scope.errorMsg = 'Please fill all fields';
    	} else {
    	    Auth.signin($scope.user)
    	      .then(function (token) {
    	        $window.localStorage.setItem('com.RBKme', token);
              $window.username = $scope.user.username;
              $scope.user.username = '';
              $scope.user.password = '';
    	        $mdDialog.hide('Success');
    	        $location.path('/');
    	      })
    	      .catch(function (error) {
              $scope.filled = false;
              $scope.user.username = '';
              $scope.user.password = '';
              $scope.errorMsg = 'Wrong Username or Password';
    	        console.error(error);
    	      });
    	 }
  };

  $scope.signout = function () {
    $window.username = '';
    Auth.signout();
  };

  $scope.forgotPassword = function (ev) {
      // defining the size of the pop-up to make it responsive
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

      // showing the pop-up and giving the handling to the profileViewController
      $mdDialog.show({
        controller: 'AuthController',
        templateUrl: 'app/auth/forgot.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: useFullScreen
      })
      .then(function(answer) {
        // if the user chose to edit the profile he/she
        // will be redirected to another pop-up for editing the info.
        if(answer){
          console.log(answer);
          $location.path('/');
          // $scope.editProfile(ev,user,$mdDialog);
        }
      }, function() {
        $location.path('/');
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

   $scope.requestPass = function(){
    var objToSend = {};
    $scope.filled = true;
    if(!$scope.user.forogtUser && !$scope.user.forgotEmail){
      $scope.filled = false;
      $scope.errorMsg = 'Please fill one of the boxes';
    } else {
      if($scope.user.forogtUser){
        objToSend.username = $scope.user.forogtUser;
      } else if($scope.user.forgotEmail){
        objToSend.email = $scope.user.forgotEmail;
      }
      Auth.forgotPassword(objToSend)
      .then(function(response){
        console.log(response);
      })
      .catch(function(error){
        console.log(error);
      });
      $scope.user.forogtUser = '';
      $scope.user.forgotEmail = '';
      $scope.hide();
    }
   };

   $scope.hide = function() {
    $mdDialog.hide();
   };
  
   $scope.cancel = function() {
    $mdDialog.cancel();
   };

});
