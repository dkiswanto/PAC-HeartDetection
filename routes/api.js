/**
 * Created by g40 on 28/07/16.
 */

var express = require('express');
var router = express.Router();
var doctor = require('../models/doctor');

router.get('/doctors', function(req, res, next){
    doctor.find({}, function(err, doctors){
        if(err){
            res.json(err);
        }
        res.json(doctors);
    });
});

router.get('/doctors/:username', function(req, res, next){
    doctor.find({username : req.params.username}, function(err, doctor){
        if(err){
            res.json(err);
        } 
        res.json(doctor);
    });
});


module.exports = router;