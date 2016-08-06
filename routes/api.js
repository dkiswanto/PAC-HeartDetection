/**
 * Created by g40 on 28/07/16.
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var mongoose = require('mongoose');
var Doctor = require('../models/doctor');
var Patient = require('../models/patient');
var Alert = require('../models/alert');

//-------- Mobile Auth -----------//

router.post('/login', jsonParser, function(req, res, next) {
    console.log(req.body);
    passport.authenticate('api-login', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.json({message : "wrong username or password"}) }
        req.logIn(user, function(err) {
            if (err) { return next(err); }

            // return user info
            Patient.findOne({username: req.body.username}, function (err,data) {
                return res.json(data);
            })
        });
    })(req, res, next);

}); // Tested

router.post('/register', jsonParser, function(req, res, next) {
    Patient.register(new Patient({ username : req.body.username, name : req.body.name }), req.body.password, function(err, account) {
        if (err) {
            res.json(err);
        }
        passport.authenticate('api-login')(req, res, function () {
            Patient.findOne({username: req.body.username}, function (err,data) {
                return res.json(data);
            })
        });
    });
}); // Tested

//-------- End Mobile Auth -----------//
// get data patient
router.get('/patient/:username', function(req, res){
    Patient.find({username : req.params.username}, function(err, data){
        if(err){
            res.json(err);
        } else {
            res.json(data);
        }
    });
}); // Tested

// submit data patient
router.post('/patient/:username', jsonParser, function (req, res) {
    Patient.findOne({username : req.params.username}, function (err, data) {
        if(err){
            return res.json(err);
        } else {
            // body.address, device_id, phone_num, alert_phone, alert_email,
            data.name = req.body.name;
            // data.doctor = mongoose.Types.ObjectId(req.body._doctor);
            data.address = req.body.address;
            data.device_id = req.body.device_id;
            data.phone_number = req.body.phone_number;
            data.alert_email = req.body.alert_email;
            data.alert_phone = req.body.alert_phone;
            data.save();

            return res.json({message: "data patient has been edit"});
        }
    })
}); //change patient data

// get alert data by patient-id
router.get('/alert/:patient-id', function (req, res) {
    Alert.find({_patient : req.params.patient-id}, function(err,data) {
        if(err){
            return res.json(err);
        } else {
            return res.json(data);
        }
    });
});

// set patient doctor, patient-id in url param, doctor-id in body param
router.post('/set-doctor/:patient_id', jsonParser, function (req,res) {
    Patient.findOne({_id : req.params.patient_id}, function (err, patient) {
        if(err){
            return res.json(err);
        } else {
            // console.log(req.body.doctor_id)
            // ;
            if(req.body.doctor_id == null){
                return res.json({message : "please provide data doctor_id"})
            }

            try {
                Doctor.findOne({_id : mongoose.Types.ObjectId(req.body.doctor_id)}, function (err, data) {
                    if(err){
                        return res.json(err);
                    } else {
                        console.log(data);
                        if(data == null){
                            return res.json({message : "doctor not found"});
                        }
                        data.patients.push(mongoose.Types.ObjectId(req.params.patient_id));
                        // body.address, device_id, phone_num, alert_phone, alert_email,
                        patient._doctor = mongoose.Types.ObjectId(req.body.doctor_id);
                        data.save();
                        patient.save();

                        //save patient doctor

                        return res.json({message: "patient doctor has been changed"});
                    }
                });

            } catch(err) {
                return res.json({message : "doctor_id not found"});
            }

        }
    })

}); // Tested


// endpoint just for information
router.get('/doctors', function(req, res, next){
    Doctor.find({}, function(err, doctors){
        if(err){
            res.json(err);
        }
        res.json(doctors);
    });
});

router.get('/doctors/:username', function(req, res, next){
    Doctor.find({username : req.params.username}, function(err, doctor){
        if(err){
            res.json(err);
        } 
        res.json(doctor);
    });
});


module.exports = router;