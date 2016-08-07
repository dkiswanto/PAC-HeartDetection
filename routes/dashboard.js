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

    Patient.find({_doctor : req.user._id}, function (err, patients) {
        // res.json(patients);
        if(err){
            return res.send("Something wrong with - Dashboard List Patients");
        } else {
            res.render('dashboard/patients', {
                req : req,
                page_name : "patients",
                patients : patients
            });

        }

    });

});

router.get('/patients/:id', function (req,res,next) {

    Patient.findOne({_id : req.params.id}, function (err, patient) {

        if(err){
            return res.send(err);
        } else {
            res.render('dashboard/patient-detail', {
                req : req,
                page_name : "patients",
                patient : patient
            });
            // return res.json(patient);
        }

    });

});

router.get('/monitoring', function (req,res,next) {

    Patient.find({_doctor : req.user._id}, function (err, patients) {
        // res.json(patients);
        if(err){
            return res.send("Something wrong with - Dashboard Monitoring Patients");
        } else {
            res.render('dashboard/monitoring-mode', {
                req : req,
                page_name : "monitoring",
                patients : patients
            });

        }

    });

});

router.get('/log-alert', function (req,res,next) {
    res.render('dashboard/log-alert', { req : req, page_name : "log-alert"});
});


module.exports = router;