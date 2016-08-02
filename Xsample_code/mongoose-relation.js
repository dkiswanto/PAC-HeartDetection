/**
 * Created by g40 on 02/08/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/training_mongoose');

var PatientSchema = Schema({
    name : String,
    age : Number,
    _doctor : { type: Schema.Types.ObjectId, ref: 'Doctor' }
});

var DoctorSchema = Schema({
    name : String,
    patients : [{ type: Schema.Types.ObjectId, ref: 'Patient'}]
});

var Patient = mongoose.model('Patient', PatientSchema);
var Doctor = mongoose.model('Doctor', DoctorSchema);

// create doctor
// var newDoctor = new Doctor({name : "Dr. Abdul Muhidin"});
// newDoctor.save();

// doctor add new patient
Doctor.findOne({name : "Dr. Abdul Muhidin"}, function(err, data){
    var newPatient = new Patient({ name : "Patient1"});
    newPatient._doctor = data._id;
    newPatient.save();
    data.patients.push(newPatient);
    data.save();
});


// var newParent = new Parent({ name : "Pull Pull"});
// newParent.child.push(newChild._id);
// newParent.save();


// Parent.find().populate('child').exec(function(err, data) {
//     // console.log(data.name + " adalah bapaknya " + data.child.name);
//     console.log(data);
// });

