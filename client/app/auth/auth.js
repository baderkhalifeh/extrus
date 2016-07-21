angular.module('RBKme.auth', [])

.controller('AuthController', function ($scope, $window, $location, $mdDialog, Auth) {
  
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
              $scope.user.username = '';
              $scope.user.password = '';
    	        $mdDialog.hide();
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
    Auth.signout();
  };

  $scope.forgotPassword = function () {
  	// $scope.user
   //  $scope.userOrEmail = {
   //    newPassword : $scope.newPassword 
   //  };
   //  Auth.forgotPassword ($scope.newPassword)
   //  .then(function () {
   //      $location.path('/');
   //  })
   //  .catch(function (error) {
   //      console.error(error);
   //  });
   };

   $scope.hide = function() {
    $mdDialog.hide();
   };
  
   $scope.cancel = function() {
    $mdDialog.cancel();
   };

});
