var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var logger = require('morgan');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var MongoStore = require('connect-mongo')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

var app = express();

//Config database connection
mongoose.connect('mongodb://admin:abcd1234@ds245680.mlab.com:45680/group2webproject');

require('./config/passport');


// view engine setup
app.engine('.hbs', exphbs({
  defaultLayout: 'layout',
  extname: '.hbs',
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: false
// }));

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: 'El Psy Kongroo', 
  resave: false, 
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  cookie: {maxAge: 180 * 60 * 2000}//20m
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  if (req.isAuthenticated()){
    res.locals.userInfo = req.user;
    res.locals.admin = req.user.admin;
    // console.log(req.user);
  }
  else
    res.locals.admin = false;
  next();
});

app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
