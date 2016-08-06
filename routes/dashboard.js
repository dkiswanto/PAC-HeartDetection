/**
 * Created by g40 on 29/06/16.
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');
var Patient = require('../models/patient');

router.get('/' , function (req,res,next) {
    res.render('dashboard/dashboard-main', {
        req : req,
        page_name : "main"
    } );
});

router.get('/patients', function (req,res,next) {


    res.render('dashboard/patients', {
        req : req,
        page_name : "patients"
    });
});

router.get('/patients/detail', function (req,res,next) {
    res.render('dashboard/patient-detail', { req : req, page_name : "patients"});
});

router.get('/monitoring', function (req,res,next) {
    res.render('dashboard/monitoring-mode', { req : req, page_name : "monitoring"});
});

router.get('/log-alert', function (req,res,next) {
    res.render('dashboard/log-alert', { req : req, page_name : "log-alert"});
});


module.exports = router;