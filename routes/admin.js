var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var Order = require('../models/order');
var User = require('../models/user');

var csrfPro = csrf();
router.use(csrfPro);

//Logged-In functions
router.get('/order-manage', isAdmin, function (req, res, next) {
    Order.find({}).sort({ 'added': -1 }).exec(function (err, docs) {
        if (err) {
            return res.render('error', { message: err });
        }
        return res.render('admin/order-list', { title: 'Danh sách dơn hàng', orders: docs });
    });
});

router.get('/member-manage', isAdmin, function (req, res, next) {
    User.find({admin: false}).sort({ 'added': -1 }).exec(function (err, docs) {
        if (err) {
            return res.render('error', { message: err });
        }
        return res.render('admin/member-list', { title: 'Danh sách thành viên', orders: docs });
    });
});

module.exports = router;

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.admin) {
        return next();
    }
    res.redirect('/');
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/users/signin');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/users/signin');
}

