angular.module('RBKme.blog', [])

.controller('BlogController', function ($scope, $mdDialog, $mdMedia, Blogs, Users) {
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

	$scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
	
	$scope.addPost = function(ev) {
	    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
	    $mdDialog.show({
	      controller: 'newBlogController',
	      templateUrl: 'app/blog/newBlog.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true,
	      fullscreen: useFullScreen
	    })
	    .then(function(blog) {

	    	$scope.initalize();

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
