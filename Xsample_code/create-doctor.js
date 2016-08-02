/**
 * Created by g40 on 29/07/16.
 */

var Doctor = require('../models/doctor');

setTimeout(function () {
    Doctor.register(new Doctor({ username : "kinto_doc" }), "qwerty123", function(err, account) {
        console.log('Doctor Created');
    });
}, 200);


// Doctor.register();