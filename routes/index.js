var express = require('express');
var bodyParser = require('body-parser');
var cloudinary = require('cloudinary').v2;
var Product = require('../models/product');
var Cart = require('../models/cart');
var Order = require('../models/order');

var OnePayDomestic = require('vn-payments').OnePayDomestic;

var router = express.Router();

//Config OnePay
const onepayDom = new OnePayDomestic({
	paymentGateway: 'https://mtf.onepay.vn/onecomm-pay/vpc.op',
	merchant: 'ONEPAY',
	accessCode: 'D67342C2',
	secureSecret: 'A3EFDFABA8653DF2342E8DAC29B51AF0',
});

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
  Product.find({status: true}).exec(function (err, docs) {
    var chunkSize = 4;
    var productChunks = [];
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    Product.find({status: true}).distinct('material', function (err, docs) {
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
      return Product.find({status: true}).exec(function (err, docs) {
        var chunkSize = 4;
        var productChunks = [];
        for (var i = 0; i < docs.length; i += chunkSize) {
          productChunks.push(docs.slice(i, i + chunkSize));
        }
        Product.find({status: true}).distinct('material', function (err, docs) {
          res.render('shop/shop', {
            title: 'Shop',
            products: productChunks,
            matList: docs
          });
        });
      });
    else
      return Product.find({status: true}).sort([
        [sortBy, order]
      ]).exec(function (err, docs) {
        var chunkSize = 4;
        var productChunks = [];
        for (var i = 0; i < docs.length; i += chunkSize) {
          productChunks.push(docs.slice(i, i + chunkSize));
        }
        Product.find({status: true}).distinct('material', function (err, docs) {
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
        material: mat,
        status: true
      }, function (err, docs) {
        var chunkSize = 4;
        var productChunks = [];
        for (var i = 0; i < docs.length; i += chunkSize) {
          productChunks.push(docs.slice(i, i + chunkSize));
        }
        Product.find({status: true}).distinct('material', function (err, docs) {
          res.render('shop/shop', {
            title: 'Shop',
            products: productChunks,
            matList: docs
          });
        });
      });
    else
      return Product.find({
        material: mat,
        status: true
      }).sort([
        [sortBy, order]
      ]).exec(function (err, docs) {
        var chunkSize = 4;
        var productChunks = [];
        for (var i = 0; i < docs.length; i += chunkSize) {
          productChunks.push(docs.slice(i, i + chunkSize));
        }
        Product.find({status: true}).distinct('material', function (err, docs) {
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
  var qty = req.body.qty;
  if (qty<1)
    return res.render('error',{message: 'Số lượng không hợp lệ.'});
  cloudinary.uploader.unsigned_upload(image, 'rli9ljen', function(err, result) { 
    if (err){
      return res.render('error', {message: err});
    } else {
      var cart = new Cart(req.session.cart ? req.session.cart : {});
      Product.findById(id, function(error, product){
        if (error){
          return res.render('error', {message: error});
        }
        cart.add(product, result.url, qty, result.public_id);
        req.session.cart = cart;
        res.redirect('/shop');
      });

    } 
  });
});

router.get('/cart', isLoggedIn, function(req, res, next){
  res.render('checkout/cart', {title: 'Giỏ hàng'});
});

router.get('/remove-from-cart/:link', function(req, res, next){
  var link = req.params.link;
  for (var id in req.session.cart.items){
    if (req.session.cart.items[id].key == link){
      req.session.cart.count--;
      req.session.cart.totalPrice = req.session.cart.totalPrice - req.session.cart.items[id].price
      req.session.cart.items.splice(id, 1);
      if (req.session.cart.totalPrice == 0)
        req.session.cart = null;
    }  
  }
  res.redirect("/cart");
});

router.get('/order-info', isLoggedIn, function(req, res, next){
  if (!req.session.cart){
    return res.redirect("/cart");
  }
  res.render('checkout/order-info', {title: 'Thông tin đơn hàng', defuser: req.user});
});

router.post('/order-info', isLoggedIn, function(req, res, next){
  if (!req.session.cart)
    return res.redirect("/cart");

  var amount = req.session.cart.totalPrice;

  ///

  req.checkBody('name', 'Tên người nhận không được trống.').notEmpty();
  req.checkBody('phone', 'Số điện thoại không được trống.').notEmpty();
  req.checkBody('addr', 'Địa chỉ không được trống.').notEmpty();

  var errors = req.validationErrors();
  if (errors){
    var emsg = [];
    errors.forEach(function(error){
      emsg.push(error.msg);
    });
    return res.render('error',{title: 'Lỗi', message: emsg[0]});
  }

  req.session.ordername = req.body.name;
  req.session.orderphone = req.body.phone;
  req.session.orderaddr = req.body.addr;

  if (req.body.paymethod != 'COD' && req.body.paymethod != 'OnePay'){
    return res.render('error',{title: 'Lỗi', message: 'Phuơng thức thanh toán không tồn tại'});
  }

  req.session.paymethod = req.body.paymethod;

  ///

  

  const clientIp =
		req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);

  const checkoutData = {
    amount: amount,
    clientIp: clientIp.length > 15 ? '127.0.0.1' : clientIp,
    locale: 'vn',
    currency: 'VND',
    orderId: `wf-${new Date().toISOString()}`,
    transactionId: `wf-${new Date().toISOString()}`
  };
  res.locals.checkoutData = checkoutData;
  
    

  let asyncCheckout = null;

  if (req.session.paymethod == 'OnePay'){
    asyncCheckout = checkoutOnePayDomestic(req, res);
  }

  if (req.session.paymethod == 'COD'){

    return CODCheckout(req, res);
  }

  if ((req.session.paymethod != 'COD') && asyncCheckout) {
		asyncCheckout
			.then(checkoutUrl => {
				res.writeHead(301, { Location: checkoutUrl.href });
				res.end();
			})
			.catch(err => {
				res.send(err);
			});
	} else {
		res.render('error',{title: 'Lỗi', message: 'Payment method not found'});
  } 
});

router.get('/payment/:gateway/callback', (req, res) => {
	const gateway = req.params.gateway;
	let asyncFunc = null;

  asyncFunc = callbackOnePayDomestic(req, res);

	if (asyncFunc) {
		asyncFunc.then(() => {
      payResult = res.locals.paySucceed;
      if (!payResult){
        return res.render('error',{title: 'Lỗi', message: 'Thanh toán chưa hoàn thành.'});
      }    
      else{
        var order = new Order({
          user: req.user,
          cart: req.session.cart,
          name: req.session.ordername,
          phone: req.session.orderphone,
          addr: req.session.orderaddr,
          paymethod: req.session.paymethod,
          status: 1,
          added: new Date()
        });
        req.session.cart = null;
        order.save(function(err, doc){
          if (err){
            return res.render('error',{title: 'Lỗi', message: 'Không thể lưu đơn hàng.'});
          }
          return res.render('index',{title: 'Trang chủ', message: 'Đơn hàng đã được ghi nhận.'});
        });  
      }
		});
	} else {
		return res.render('error',{title: 'Lỗi', message: 'Không có phản hồi.'});
	}
});

module.exports = router;

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect('/users/signin');
}

function checkoutOnePayDomestic(req, res) {
	const checkoutData = res.locals.checkoutData;
	checkoutData.returnUrl = `http://${req.headers.host}/payment/onepaydom/callback`;

	return onepayDom.buildCheckoutUrl(checkoutData).then(checkoutUrl => {
		res.locals.checkoutUrl = checkoutUrl;

		return checkoutUrl;
	});
}

function callbackOnePayDomestic(req, res) {
	const query = req.query;

	return onepayDom.verifyReturnUrl(query).then(results => {
		if (results) {
			// res.locals.email = 'tu.nguyen@naustud.io';
			// res.locals.orderId = results.orderId || '';
			// res.locals.price = results.amount;

			res.locals.paySucceed = results.isSuccess;
			// res.locals.message = results.message;
		} else {
			res.locals.isSucceed = false;
		}
	});
}

function CODCheckout(req, res){
  var order = new Order({
    user: req.user,
    cart: req.session.cart,
    name: req.session.ordername,
    phone: req.session.orderphone,
    addr: req.session.orderaddr,
    paymethod: 'COD',
    status: 1,
    added: new Date()
  });
  
  order.save(function(err, doc){
    if (err){
      console.log(order);
      return res.render('error',{title: 'Lỗi', message: 'Không thể lưu đơn hàng.'});
    }
    req.session.cart = null;
    return res.render('index',{title: 'Trang chủ', message: 'Đơn hàng đã được ghi nhận.'});
  }); 
}