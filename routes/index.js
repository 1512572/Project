var express = require('express');
var bodyParser = require('body-parser');
var cloudinary = require('cloudinary').v2;
var Product = require('../models/product');
var Cart = require('../models/cart');

var router = express.Router();

//Config Cloudinary
cloudinary.config({ 
  cloud_name: 'group2webapp', 
  api_key: '623744951941442', 
  api_secret: 'DbdBwyB-11gh0DtXIzELvR45z-I' 
});

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

router.post('/add-to-cart', function (req, res, next) {
  var image = req.body.imgdata;
  var id = req.body.id;
  
  cloudinary.uploader.unsigned_upload(image, 'rli9ljen', function(err, result) { 
    if (err){
      return res.render('error', {message: err});
    } else {
      var cart = new Cart(req.session.cart ? req.session.cart : {});
      Product.findById(id, function(error, product){
        if (error){
          return res.render('error', {message: error});
        }
        cart.add(product, result.url);
        req.session.cart = cart;
        console.log(cart);
        res.redirect('/shop');
      });

    } 
  });
});

module.exports = router;