var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Trang chủ' });
});

router.get('/shop', function(req, res, next) {
  res.render('shop/shop', { title: 'Cửa hàng' });
});

module.exports = router;
