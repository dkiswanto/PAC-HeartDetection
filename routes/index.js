var express = require('express');
var router = express.Router();
var passport = require('passport');
var Doctor = require('../models/doctor');
var Patient = require('../models/patient');


/* GET HOME PAGE. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', req : req });
//  res.redirect('/');
});

// ---------------- Auth Web Application -------------------//
router.get('/login', function(req, res, next) {
  if(req.isAuthenticated()){
    res.json({message : "already login"});
  } else {
    res.render('login');
  }
});


router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {

    if (err) { return next(err); }
    if (!user) { return res.json({message : "wrong username or password"}) }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);

});


router.get('/register', function(req, res, next) {
  if(req.isAuthenticated()){
    res.json({message : "already register and login"});
  } else {
    res.render('register');
  }
});

router.post('/register', function(req, res, next) {
  Doctor.register(new Doctor({ username : req.body.username, name : req.body.name }), req.body.password, function(err, account) {
    if (err) {
      // res.render('register', { account : account });
      res.json({message : "username already taken"});
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });});


router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


// -------------- END Auth Web Application ----------------//


router.get('/patient', function(req, res) {
  function getDoctor(username, callback) {
    Doctor.find({username : "kinto"}, function(err, data){
      console.log(data[0]);
      if (err) {
        callback(err, null);
      } else {
        callback(null, data[0]);
      }
    });
  }

  getDoctor("kazuo", function (err, data) {
    if(err) {
      res.json(err);
    } else {
      console.log(data);
      var patient = new Patient({username : "patient_dodol", doctorx : data});
      res.json({message : "patient created with doctor : " + data.username});
      patient.save();
    }
  });
});


// Testing Router
router.get('/try-socket', function(req, res, next) {
  res.render('socket-client', { title: 'Express' });
});


router.get('/test-auth', function(req, res) {
  // res.redirect('/');
  res.send(req.user);
});


module.exports = router;
