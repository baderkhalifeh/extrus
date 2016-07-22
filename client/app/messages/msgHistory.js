angular.module('RBKme.msgHistory', [])

.controller('msgHistoryController', function ($scope, $mdDialog, Messages, fromToObj) {

	$scope.data = {};
	
	$scope.initalize = function(){
		console.log(fromToObj);
		Messages.getMessages(fromToObj)
		.then(function(response){
			$scope.data.msgs = response;
		})
		.catch(function(error){
			console.log(error);
		});
	}

	$scope.hide = function() {
    	$mdDialog.hide();
	};
	
	$scope.cancel = function() {
    	$mdDialog.cancel();
	};

	$scope.initalize();
});