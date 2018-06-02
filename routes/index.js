var express = require('express');
var router = express.Router();
var Product = require('../models/product');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Trang chủ'
  });
});

router.get('/shop', function (req, res, next) {
  Product.find(function (err, docs) {
    var chunkSize = 4;
    var productChunks = [];
    for (var i = 0; i < docs.length; i += chunkSize){
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/shop', {
      title: 'Shop',
      products: productChunks
    });
  });
});

router.get('/product/:id', function(req, res, next){
  var id = req.params.id;
  Product.findOne({ _id: id, status: true }, function(err, docs){
    res.render('shop/product', {product: docs, err: err});
  });
  
});

module.exports = router;