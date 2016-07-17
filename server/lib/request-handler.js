var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');

///var db = require('../app/config.solution');
///var User = require('../app/models/user.solution');

// exports.renderIndex = function(req, res) {
//   res.render('index');
// };

// exports.loginUserForm = function(req, res) {
//   res.render('login');
// };

exports.logoutUser = function(req, res) {
  req.session.destroy(function(){
    // res.redirect('/login');
  });
};

exports.fetchUsers = function(req, res) {
  User.find({}).exec(function(err,links) {
    res.send(200, links);
  })
};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username })
    .exec(function(err,user) {
      if (!user) {
        res.redirect('/login');
      } else {
        var savedPassword = user.password;
        User.comparePassword(password, savedPassword, function(err, match) {
          if (match) {
            util.createSession(req, res, user);
          } else {
            res.redirect('/login');
          }
        });
      }
  })
};
