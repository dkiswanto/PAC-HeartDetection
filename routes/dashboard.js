/**
 * Created by g40 on 29/06/16.
 */

var express = require('express');
var router = express.Router();

router.get('/', function (req,res,next) {
    res.render('dashboard/dashboard-main', { page_name : "main"} );
});

router.get('/patients', function (req,res,next) {
    res.render('dashboard/patients', { page_name : "patients"});
});

router.get('/patients/detail', function (req,res,next) {
    res.render('dashboard/patient-detail', { page_name : "patients"});
});

router.get('/monitoring', function (req,res,next) {
    res.render('dashboard/monitoring-mode', { page_name : "monitoring"});
});

router.get('/log-alert', function (req,res,next) {
    res.render('dashboard/log-alert', { page_name : "log-alert"});
});


module.exports = router;