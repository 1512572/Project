var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/signin', function(req, res, next) {
  res.render('users/signin', { title: 'Đăng nhập' });
});

router.get('/signup', function(req, res, next) {
  res.render('users/signup', { title: 'Đăng kí' });
});

module.exports = router;
