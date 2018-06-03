var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var csrfPro = csrf();
router.use(csrfPro);

/* GET users listing. */
router.get('/signin', function(req, res, next) {
  res.render('users/signin', { title: 'Đăng nhập' });
});

router.get('/signup', function(req, res, next) {
  var msg = req.flash('error');
  res.render('users/signup', { title: 'Đăng kí', csrfToken: req.csrfToken(), msg: msg});
});

router.post('/signup', passport.authenticate('local.signup',{
  successRedirect: "/users/profile",
  failureRedirect: '/users/signup',
  failureFlash: true
}));

router.get('/profile', function(req, res, next){
  res.render('users/profile',{title: 'Tài khoản'});
});

module.exports = router;
