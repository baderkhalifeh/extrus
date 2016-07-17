var request = require('request');

// exports.getUrlTitle = function(url, cb) {
//   request(url, function(err, res, html) {
//     if (err) {
//       console.log('Error reading url heading: ', err);
//       return cb(err);
//     } else {
//       var tag = /<title>(.*)<\/title>/;
//       var match = html.match(tag);
//       var title = match ? match[1] : url;
//       return cb(err, title);
//     }
//   });
// };

exports.isLoggedIn = function(req, res) {
  return req.session ? !!req.session.user : false;
};

exports.checkUser = function(req, res, next) {
  if (!exports.isLoggedIn(req)) {
    res.redirect('/login');
  } else {
    next();
  }
};

exports.createSession = function(req, res, newUser) {
  return req.session.regenerate(function() {
      req.session.user = newUser;
      res.redirect('/');
    });
};