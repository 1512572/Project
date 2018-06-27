var express = require('express');
var bodyParser = require('body-parser');
var cloudinary = require('cloudinary').v2;
var csrf = require('csurf');
var User = require('../models/user');
var Order = require('../models/order');
var Product = require('../models/product');

var router = express.Router();

//Config Cloudinary
cloudinary.config({
    cloud_name: 'group2webapp',
    api_key: '623744951941442',
    api_secret: 'DbdBwyB-11gh0DtXIzELvR45z-I'
});

//Config Csrf
var csrfPro = csrf();
router.use(csrfPro);

router.use(bodyParser.json({
    limit: '5mb'
}));

router.use(bodyParser.urlencoded({
    limit: '5mb',
    extended: true
}));


//Quản lí thành viên
router.get('/member-manager', isAdmin, function (req, res, next) {
    User.find({
        admin: false
    }).exec(function (err, users) {
        if (err) {
            return res.render('error', {
                title: 'Lỗi',
                message: err
            });
        }
        return res.render('admin/member-manager', {
            title: 'Quản lí thành viên',
            users: users,
            csrfToken: req.csrfToken()
        });
    });
});

router.post('/member-manager', isAdmin, function (req, res, next) {
    req.checkBody('input', 'Tìm kiếm không hợp lệ.').notEmpty().isEmail();
    var errors = req.validationErrors();
    if (errors) {
        var emsg = [];
        errors.forEach(function (error) {
            emsg.push(error.msg);
        });
        return res.render('error', {
            title: 'Lỗi',
            message: emsg[0]
        });
    }
    var input = req.body.input;

    User.findOne({
        email: input
    }).exec(function (err, user) {
        if (err) {
            return res.render('error', {
                title: 'Lỗi',
                message: 'Không thể tim thấy kết quả mong muốn.'
            });
        }
        if (!user) {
            return res.render('error', {
                title: 'Lỗi',
                message: 'Không thể tim thấy kết quả mong muốn.'
            });
        }
        res.redirect('/admin/view-member/' + user._id);
    });
});

router.get('/view-member/:id', isAdmin, function (req, res, next) {
    var id = req.params.id;
    User.findOne({
        _id: id,
        admin: false
    }).exec(function (err, user) {
        if (err) {
            return res.render('error', {
                title: 'Lỗi',
                message: err
            });
        }
        if (user.status)
            return res.render('admin/member-detail', {
                title: 'Thông tin thành viên',
                user: user,
                userstatus: 'Bình thường'
            });
        else
            return res.render('admin/member-detail', {
                title: 'Thông tin thành viên',
                user: user,
                userstatus: 'Banned'
            });
    });
});

router.get('/ban/:id', isAdmin, function (req, res, next) {
    var id = req.params.id;
    User.findOne({
        _id: id,
        admin: false
    }).exec(function (err, user) {
        if (err) {
            return res.render('error', {
                title: 'Lỗi',
                message: err
            });
        }
        user.status = false;
        user.save(function (err, doc) {
            if (err) {
                return res.render('error', {
                    title: 'Lỗi',
                    message: err
                });
            }
            return res.redirect('/admin/view-member/' + id);
        });
    });
});

router.get('/unban/:id', isAdmin, function (req, res, next) {
    var id = req.params.id;
    User.findOne({
        _id: id,
        admin: false
    }).exec(function (err, user) {
        if (err) {
            return res.render('error', {
                title: 'Lỗi',
                message: err
            });
        }
        user.status = true;
        user.save(function (err, doc) {
            if (err) {
                return res.render('error', {
                    title: 'Lỗi',
                    message: err
                });
            }
            return res.redirect('/admin/view-member/' + id);
        });
    });
});

//Quản lí đơn hàng
router.get('/order-manager', isAdmin, function (req, res, next) {
    Order.find().sort({
        added: -1
    }).exec(function (err, orders) {
        if (err) {
            return res.render('error', {
                title: 'Lỗi',
                message: err
            });
        }
        return res.render('admin/order-manager', {
            title: 'Quản lí đơn hàng',
            orders: orders
        });
    });
});

router.get('/view-order/:id', isAdmin, function (req, res, next) {
    var id = req.params.id;
    Order.findOne({
        _id: id
    }).exec(function (err, doc) {
        if (err) {
            return res.render('error', {
                title: 'Lỗi',
                message: err
            });
        }
        if (!doc) {
            return res.render('error', {
                title: 'Lỗi',
                message: 'Không thể truy cập đơn hàng này.'
            });
        }
        console.log(doc);
        User.findById(doc.user).exec(function (err, result) {
            if (err) {
                return res.render('error', {
                    title: 'Lỗi',
                    message: err
                });
            }
            if (doc.status == 1)
                return res.render('admin/order-detail', {
                    title: 'Chi tiết đơn hàng',
                    order: doc,
                    orderstatus: 'Đang xử lí',
                    cancelable: true,
                    usermail: result.email
                });
            if (doc.status > 1)
                return res.render('admin/order-detail', {
                    title: 'Chi tiết đơn hàng',
                    order: doc,
                    orderstatus: 'Hoàn thành',
                    cancelable: false,
                    usermail: result.email
                });
            return res.render('admin/order-detail', {
                title: 'Chi tiết đơn hàng',
                order: doc,
                orderstatus: 'Bị hủy',
                cancelable: false,
                usermail: result.email
            });
        });
    });
});

router.get('/cancel-order/:id', isAdmin, function (req, res, next) {
    var orderid = req.params.id;
    Order.findOne({
        _id: orderid
    }).exec(function (err, doc) {
        if (err) {
            return res.render('error', {
                message: err
            });
        }
        doc.status = 0;
        doc.save(function (err, doc) {
            if (err) {
                return res.render('error', {
                    message: err
                });
            }
            return res.redirect('/admin/order-manager');
        });
    });
});

router.get('/mark-as-done/:id', isAdmin, function (req, res, next) {
    var orderid = req.params.id;
    Order.findOne({
        _id: orderid
    }).exec(function (err, doc) {
        if (err) {
            return res.render('error', {
                message: err
            });
        }
        doc.status = 2;
        doc.save(function (err, doc) {
            if (err) {
                return res.render('error', {
                    message: err
                });
            }
            return res.redirect('/admin/order-manager');
        });
    });
});

//Quản lí sản phẩm
router.get('/product-manager', isAdmin, function (req, res, next) {
    Product.find().sort({
        added: -1
    }).exec(function (err, products) {
        if (err) {
            return res.render('error', {
                title: 'Lỗi',
                message: err
            });
        }
        return res.render('admin/product-manager', {
            title: 'Quản lí sản phẩm',
            products: products
        });
    });
});

router.get('/view-product/:id', isAdmin, function (req, res, next) {
    var id = req.params.id;
    Product.findOne({
        _id: id
    }).exec(function (err, product) {
        if (err) {
            return res.render('error', {
                title: 'Lỗi',
                message: 'Không thể tìm thấy sản phẩm này.'
            });
        }
        return res.render('admin/product-detail', {
            title: 'Chi tiết sản phẩm',
            product: product,
            active: product.status
        });
    });
});

router.get('/edit-product/:id', isAdmin, function (req, res, next) {
    var id = req.params.id;
    Product.findOne({
        _id: id
    }).exec(function (err, item) {
        if (err) {
            return res.render('error', {
                title: 'Lỗi',
                message: 'Không thể tìm thấy sản phẩm này.'
            });
        }
        return res.render('admin/edit-product', {
            title: 'Sửa thông tin sản phẩm',
            product: item,
            csrfToken: req.csrfToken()
        })
    });
});

router.post('/edit-product', isAdmin, function (req, res, next) {

    req.checkBody('name', 'Tên không được trống.').notEmpty();
    req.checkBody('price', 'Giá không hợp lệ.').notEmpty().isNumeric();
    req.checkBody('material', 'Chất liệu không được trống.').notEmpty();
    req.checkBody('desc', 'Mô tả không được trống.').notEmpty();
    req.checkBody('width', 'Chiều rộng không hợp lệ.').notEmpty().isNumeric();
    req.checkBody('height', 'Chiều cao không được trống.').notEmpty().isNumeric();

    var errors = req.validationErrors();
    if (errors) {
        var emsg = [];
        errors.forEach(function (error) {
            emsg.push(error.msg);
        });
        return res.render('error', {
            title: 'Lỗi',
            message: emsg[0]
        });
    }

    if (req.body.price < 1000) {
        return res.render('error', {
            title: 'Lỗi',
            message: 'Giá không hợp lệ (>=1000VNĐ).'
        });
    }

    if (req.body.width < 1) {
        return res.render('error', {
            title: 'Lỗi',
            message: 'Chiều rộng không hợp lệ.'
        });
    }

    if (req.body.height < 1) {
        return res.render('error', {
            title: 'Lỗi',
            message: 'Chiều rộng không hợp lệ.'
        });
    }

    var image = req.body.imgdata;
    var id = req.body.id;
    var name = req.body.name;
    var price = req.body.price;
    var material = req.body.material;
    var desc = req.body.desc;
    var width = req.body.width;
    var height = req.body.height;

    cloudinary.uploader.unsigned_upload(image, 'rli9ljen', function (err, result) {
        if (err) {
            return res.render('error', {
                title: 'Lỗi',
                message: err
            });
        } else {
            Product.findOne({
                _id: id
            }).exec(function (err, product) {
                if (err) {
                    return res.render('error', {
                        title: 'Lỗi',
                        message: err
                    });
                }
                product.image = result.url;
                product.name = name;
                product.price = price;
                product.material = material;
                product.desc = desc;
                product.width = width;
                product.height = height;
                product.save(function (err, item) {
                    if (err) {
                        return res.render('error', {
                            title: 'Lỗi',
                            message: err
                        });
                    }
                    return res.redirect('/admin/product-manager');
                });
            });
        }
    });
});

router.get('/add-product', isAdmin, function (req, res, next) {
    return res.render('admin/add-product', {
        title: 'Thêm sản phẩm',
        csrfToken: req.csrfToken()
    });
});

router.post('/add-product', isAdmin, function (req, res, next) {

    req.checkBody('name', 'Tên không được trống.').notEmpty();
    req.checkBody('price', 'Giá không hợp lệ.').notEmpty().isNumeric();
    req.checkBody('material', 'Chất liệu không được trống.').notEmpty();
    req.checkBody('desc', 'Mô tả không được trống.').notEmpty();
    req.checkBody('width', 'Chiều rộng không hợp lệ.').notEmpty().isNumeric();
    req.checkBody('height', 'Chiều cao không được trống.').notEmpty().isNumeric();

    var errors = req.validationErrors();
    if (errors) {
        var emsg = [];
        errors.forEach(function (error) {
            emsg.push(error.msg);
        });
        return res.render('error', {
            title: 'Lỗi',
            message: emsg[0]
        });
    }

    if (req.body.price < 1000) {
        return res.render('error', {
            title: 'Lỗi',
            message: 'Giá không hợp lệ (>=1000VNĐ).'
        });
    }

    if (req.body.width < 1) {
        return res.render('error', {
            title: 'Lỗi',
            message: 'Chiều rộng không hợp lệ.'
        });
    }

    if (req.body.height < 1) {
        return res.render('error', {
            title: 'Lỗi',
            message: 'Chiều rộng không hợp lệ.'
        });
    }

    var image = req.body.imgdata;
    var id = req.body.id;
    var name = req.body.name;
    var price = req.body.price;
    var material = req.body.material;
    var desc = req.body.desc;
    var width = req.body.width;
    var height = req.body.height;

    cloudinary.uploader.unsigned_upload(image, 'rli9ljen', function (err, result) {
        if (err) {
            return res.render('error', {
                title: 'Lỗi',
                message: err
            });
        } else {
            var product = new Product();
            product.image = result.url;
            product.name = name;
            product.price = price;
            product.material = material;
            product.desc = desc;
            product.width = width;
            product.height = height;
            product.added = new Date();
            product.status = true;
            product.save(function (err, item) {
                if (err) {
                    return res.render('error', {
                        title: 'Lỗi',
                        message: err
                    });
                }
                return res.redirect('/admin/product-manager');
            });
        }
    });
});

router.get('/deactive-product/:id', isAdmin, function (req, res, next) {
    var id = req.params.id;
    Product.findOne({
        _id: id
    }).exec(function (err, item) {
        if (err) {
            return res.render('error', {
                title: 'Lỗi',
                message: 'Không thể truy cập thông tin sản phẩm này.'
            });
        }
        item.status = false;
        item.save(function (err, doc) {
            if (err) {
                return res.render('error', {
                    title: 'Lỗi',
                    message: 'Không thể cập nhật thông tin sản phẩm này.'
                });
            }
            return res.redirect('/admin/product-manager');
        });
    });
});

router.get('/active-product/:id', isAdmin, function (req, res, next) {
    var id = req.params.id;
    Product.findOne({
        _id: id
    }).exec(function (err, item) {
        if (err) {
            return res.render('error', {
                title: 'Lỗi',
                message: 'Không thể truy cập thông tin sản phẩm này.'
            });
        }
        item.status = true;
        item.save(function (err, doc) {
            if (err) {
                return res.render('error', {
                    title: 'Lỗi',
                    message: 'Không thể cập nhật thông tin sản phẩm này.'
                });
            }
            return res.redirect('/admin/product-manager');
        });
    });
});

//Thống kê

router.get('/stats', isAdmin, function (req, res, next) {
    Order.find({
        status: 2
    }).exec(function (err, orders) {
        if (err) {
            return res.render('error', {
                title: 'Lỗi',
                message: 'Không thể truy cập danh sách đơn hàng.'
            });
        }


        itemname = [];
        itemqty = [];
        matname = [];
        matqty = [];
        amount = 0;
        ordercount = 0;
        totalqty = 0;
        for (var i = 0; i < orders.length; i++) {
            for (var j = 0; j < orders[i].cart.items.length; j++) {
                totalqty += Number(orders[i].cart.items[j].qty);
                check = false;
                for (var k = 0; k < itemname.length; k++) {

                    if (itemname[k] == orders[i].cart.items[j].item.name) {
                        itemqty[k] += Number(orders[i].cart.items[j].qty);
                        check = true;
                        break;
                    }

                }
                if (!check) {
                    itemname.push(orders[i].cart.items[j].item.name);
                    itemqty.push(Number(orders[i].cart.items[j].qty));
                }


                check = false;
                for (var k = 0; k < matname.length; k++) {

                    if (matname[k] == orders[i].cart.items[j].item.material) {
                        matqty[k] += Number(orders[i].cart.items[j].qty);
                        check = true;
                        break;
                    }

                }
                if (!check) {
                    matname.push(orders[i].cart.items[j].item.material);
                    matqty.push(Number(orders[i].cart.items[j].qty));
                }
            }

            amount += orders[i].cart.totalPrice;
            ordercount++;
        }
        return res.render('admin/stats', {
            title: 'Thống kê',
            csrfToken: req.csrfToken(),
            amount: amount,
            count: ordercount,
            totalqty: totalqty,
            itemname: itemname,
            itemqty: itemqty,
            matname: matname,
            matqty: matqty
        });
    });
});

router.post('/stats', isAdmin, function (req, res, next) {
    req.checkBody('fromdate', 'Ngày nhập vào không hợp lệ.').notEmpty();
    req.checkBody('todate', 'Ngày nhập vào không hợp lệ.').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        var emsg = [];
        errors.forEach(function (error) {
            emsg.push(error.msg);
        });
        return res.render('error', {
            title: 'Lỗi',
            message: emsg[0]
        });
    }
    var dateFrom = req.body.fromdate;
    var dateTo = req.body.todate;
    if (dateFrom > dateTo) {
        return res.render('error', {
            title: 'Lỗi',
            message: 'Ngày bắt đầu không thể lớn hơn ngày kết thúc.'
        });
    }

    Order.find({
        status: 2
    }).exec(function (err, result) {
        if (err) {
            return res.render('error', {
                title: 'Lỗi',
                message: 'Không thể truy cập danh sách đơn hàng.'
            });
        }

        orders = [];
        for (var i = 0; i < result.length; i++){
            moment = result[i].added.toISOString().substring(0, 10);
            if ((dateFrom <= moment) && (moment <= dateTo)){
                orders.push(result[i]);
            }
        }

        itemname = [];
        itemqty = [];
        matname = [];
        matqty = [];
        amount = 0;
        ordercount = 0;
        totalqty = 0;
        for (var i = 0; i < orders.length; i++) {
            for (var j = 0; j < orders[i].cart.items.length; j++) {
                totalqty += Number(orders[i].cart.items[j].qty);
                check = false;
                for (var k = 0; k < itemname.length; k++) {

                    if (itemname[k] == orders[i].cart.items[j].item.name) {
                        itemqty[k] += Number(orders[i].cart.items[j].qty);
                        check = true;
                        break;
                    }

                }
                if (!check) {
                    itemname.push(orders[i].cart.items[j].item.name);
                    itemqty.push(Number(orders[i].cart.items[j].qty));
                }

                check = false;
                for (var k = 0; k < matname.length; k++) {

                    if (matname[k] == orders[i].cart.items[j].item.material) {
                        matqty[k] += Number(orders[i].cart.items[j].qty);
                        check = true;
                        break;
                    }

                }
                if (!check) {
                    matname.push(orders[i].cart.items[j].item.material);
                    matqty.push(Number(orders[i].cart.items[j].qty));
                }
            }

            amount += orders[i].cart.totalPrice;
            ordercount++;
        }
        return res.render('admin/stats', {
            title: 'Thống kê',
            csrfToken: req.csrfToken(),
            amount: amount,
            count: ordercount,
            totalqty: totalqty,
            itemname: itemname,
            itemqty: itemqty,
            matname: matname,
            matqty: matqty
        });
    });

});


module.exports = router;

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.admin) {
        return next();
    }
    res.redirect('/');
}