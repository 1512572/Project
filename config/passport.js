var passport = require('passport');
var User = require('../models/user');
var LocalStr = require('passport-local').Strategy;

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});

passport.use('local.signup', new LocalStr({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done){
    User.findOne({'email': email}, function(err, user){
        if (err){
            return done(err);
        }
        if (user){
            return done(null, false, {message: 'Email này đã được sử dụng.'});
        }
        var repass = req.body.repassword;
        if (repass != password){
            return done(null, false, {message: 'Nhập lại mật khẩu không chính xác.'});
        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.name = req.body.name;
        newUser.phone = req.body.phone;
        newUser.addr = req.body.addr;
        newUser.admin = false;
        newUser.added = new Date();
        newUser.status = true;
        newUser.save(function(err, result){
            if (err){
                return done(err);
            }
            return done(null, newUser);
        });
    });
}));