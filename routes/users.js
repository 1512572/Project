var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var csrfPro = csrf();
router.use(csrfPro);


router.get('/profile', isLoggedIn, function(req, res, next){
  res.render('users/profile',{title: 'Tài khoản'});
});

router.get('/signout', isLoggedIn, function(req, res, next){
  req.logout();
  res.redirect('/');
});

//Not-Logged-In functions
router.use('/', notLoggedIn, function(req, res, next){
  next();
});

router.get('/signup', function(req, res, next) {
  var msg = req.flash('error');
  res.render('users/signup', { title: 'Đăng kí', csrfToken: req.csrfToken(), msg: msg});
});

router.post('/signup', passport.authenticate('local.signup',{
  successRedirect: '/users/profile',
  failureRedirect: '/users/signup',
  failureFlash: true
}));

router.get('/signin', function(req, res, next) {
  var msg = req.flash('error');
  res.render('users/signin', { title: 'Đăng nhập', csrfToken: req.csrfToken(), msg: msg});
});

router.post('/signin', passport.authenticate('local.signin',{
  successRedirect: '/',
  failureRedirect: '/users/signin',
  failureFlash: true
}));

module.exports = router;

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/users/signin');
}

function notLoggedIn(req, res, next){
  if (!req.isAuthenticated()){
    return next();
  }
  res.redirect('/users/signin');
}

function isAdmin(req, res, next){
  if (req.isAuthenticated())
    if (req.user.admin)
      return next();
  res.redirect('/users/signin');
}
