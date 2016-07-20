angular.module('RBKme.profileView', [])
.controller('profileViewController', function ($scope,$mdDialog,user) {
  	
  	$scope.user = {};
  	$scope.user = user;
	
	$scope.hide = function() {
    	$mdDialog.hide();
	};
	
	$scope.cancel = function() {
    	$mdDialog.cancel();
	};

	// function to send back the answer to the main function
	// which is showProfile in the app.js to know whether you
	// want to edit the profile or not.
	$scope.answer = function(answer) {
    	$mdDialog.hide(answer);
	};
});

