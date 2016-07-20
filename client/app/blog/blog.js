angular.module('RBKme.blog', [])

.controller('BlogController', function ($scope,Blogs,Users) {
	$scope.data = {};

	$scope.initalize = function(){
		Blogs.getAll()
		.then(function(blogs){
			$scope.data.blogs = blogs;
			Users.getAll()
			.then(function(users){
				for(var i=0; i<$scope.data.blogs.length; i++){
					for(var j=0; j<users.length; j++){
						if($scope.data.blogs[i].from === users[j].username){
							$scope.data.blogs[i].image = users[j].image;
							$scope.data.blogs[i].name = users[j].firstName + ' ' + users[j].lastName;
							break;
						}
					}
				}
			})
			.catch(function(error){
				console.log(error);
			});
		})
		.catch(function(error){
			console.log(errors);
		});
	};

	$scope.initalize();
});
