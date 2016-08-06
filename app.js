var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var authLocal = require('./middleware/auth-local');

// import route files
var routes = require('./routes/index');
var dashboard = require('./routes/dashboard');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({keys: ['secretkey1', 'secretkey2', '...']}));

app.use(express.static(path.join(__dirname, 'public')));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// passport config
var Doctor = require('./models/doctor');
var Patient = require('./models/patient');

passport.use(new LocalStrategy(Doctor.authenticate()));
passport.use('api-login', new LocalStrategy(
    Patient.authenticate()
));

// passport.use(Doctor.createStrategy());
passport.serializeUser(Doctor.serializeUser());
passport.deserializeUser(Doctor.deserializeUser());

passport.serializeUser(Patient.serializeUser());
passport.serializeUser(Patient.serializeUser());

// mongoose
mongoose.connect('mongodb://localhost:27017/pac_db');


// Registered Route
app.use('/', routes);
app.use('/dashboard', authLocal);
app.use('/dashboard', dashboard);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler - will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler - no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

