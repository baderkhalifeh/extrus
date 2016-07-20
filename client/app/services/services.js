angular.module('RBKme.services', [])

// Service for Users requests functions
.factory('Users', function ($http) {

  // function to get all the users from the database
  var getAll = function () {
    return $http({
      method: 'GET',
      url: '/api/users'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  // function to get a single user from the database
  var getOne = function (id) {
    return $http({
      method: 'GET',
      url: '/api/users/'+id
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  // function to add a single user to the database
  var addOne = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users',
      data: user
    })
    .then(function (resp) {
      return resp;
    });
  };

  // function to reset the password when you forget your password or username
  var forgot = function (email) {
  	return $http({
      method: 'POST',
      url: '/api/users/forget',
      data : { email : email}
    })
    .then(function (resp) {
      return resp;
    });
  }

  // function to save the edited info on the profile
  var editProfile = function (user) {
  	return $http({
      method: 'POST',
      url: '/api/users/editProfile',
      data : user
    })
    .then(function (resp) {
      return resp;
    });
  }

  return {
    getAll: getAll,
    getOne : getOne,
    addOne: addOne,
    forgot: forgot,
    editProfile: editProfile
  };
})

// Service for Blogs requests functions
.factory('Blogs', function ($http) {

  // function to get all blogs
  var getAll = function () {
    return $http({
      method: 'GET',
      url: '/api/blogs'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  // function to add a single blog
  var addOne = function (blog) {
    return $http({
      method: 'POST',
      url: '/api/blogs',
      data: blog
    })
    .then(function (resp) {
      return resp;
    });
  };

  return {
    getAll: getAll,
    addOne: addOne
  };
});
