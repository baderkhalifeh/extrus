angular.module('RBKme.Msg', [])

.controller('MsgController', function ($scope, Users, Messages){

	$scope.data = {};

	$scope.initalize = function(){
		Users.getAll()
		.then(function(users){
			Messages.getMessagedFriends({username:window.username})
			.then(function(list){
				var MsgdFrineds = [];
				for(var i=0; i<list.length; i++){
					for(var j=0; j<users.length; j++){
						if(users[j].username === list[i]){
							MsgdFrineds.push(users[j]);
						}
					}
				}
				$scope.data.users = MsgdFrineds;
			})
			.catch(function(error){
				console.log(error);
			});
		})
		.catch(function(error){
			console.log(error);
		})
	};

	$scope.initalize();
});