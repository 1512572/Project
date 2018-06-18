var express = require('express');
var bodyParser = require('body-parser');
var Product = require('../models/product');

var router = express.Router();

router.use(bodyParser.json({
  limit: '5mb'
}));
router.use(bodyParser.urlencoded({
  limit: '5mb',
  extended: true
}));


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
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    Product.find().distinct('material', function (err, docs) {
      res.render('shop/shop', {
        title: 'Shop',
        products: productChunks,
        matList: docs
      });
    });
  });
});

router.post('/shop', function (req, res, next) {
  var mat = req.body.material;
  var sortBy = req.body.sortBy;
  var order = req.body.order;
  if (mat === 'all') {
    if (sortBy === 'none')
      return Product.find(function (err, docs) {
        var chunkSize = 4;
        var productChunks = [];
        for (var i = 0; i < docs.length; i += chunkSize) {
          productChunks.push(docs.slice(i, i + chunkSize));
        }
        Product.find().distinct('material', function (err, docs) {
          res.render('shop/shop', {
            title: 'Shop',
            products: productChunks,
            matList: docs
          });
        });
      });
    else
      return Product.find().sort([
        [sortBy, order]
      ]).exec(function (err, docs) {
        var chunkSize = 4;
        var productChunks = [];
        for (var i = 0; i < docs.length; i += chunkSize) {
          productChunks.push(docs.slice(i, i + chunkSize));
        }
        Product.find().distinct('material', function (err, docs) {
          res.render('shop/shop', {
            title: 'Shop',
            products: productChunks,
            matList: docs
          });
        });
      });
  } else {
    if (sortBy === 'none')
      return Product.find({
        material: mat
      }, function (err, docs) {
        var chunkSize = 4;
        var productChunks = [];
        for (var i = 0; i < docs.length; i += chunkSize) {
          productChunks.push(docs.slice(i, i + chunkSize));
        }
        Product.find().distinct('material', function (err, docs) {
          res.render('shop/shop', {
            title: 'Shop',
            products: productChunks,
            matList: docs
          });
        });
      });
    else
      return Product.find({
        material: mat
      }).sort([
        [sortBy, order]
      ]).exec(function (err, docs) {
        var chunkSize = 4;
        var productChunks = [];
        for (var i = 0; i < docs.length; i += chunkSize) {
          productChunks.push(docs.slice(i, i + chunkSize));
        }
        Product.find().distinct('material', function (err, docs) {
          res.render('shop/shop', {
            title: 'Shop',
            products: productChunks,
            matList: docs
          });
        });
      });
  }
});

router.get('/product/:id', function (req, res, next) {
  var id = req.params.id;
  Product.findOne({
    _id: id,
    status: true
  }, function (err, docs) {
    if (err) {
      return res.render('shop/product', {
        title: 'Lỗi! ',
        err: err
      });
    }
    res.render('shop/product', {
      title: 'Sản phẩm ' + docs.name,
      product: docs,
    });
  });

});

router.post('/add-img', function (req, res, next) {
  var imgData = req.body.imgdata;
  if (imgData)
    res.send(imgData);
  else
    res.send('Nothing');
});

module.exports = router;