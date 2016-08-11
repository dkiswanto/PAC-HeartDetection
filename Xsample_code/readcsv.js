/**
 * Created by g40 on 10/08/16.
 */

var sleep = require('sleep');
var mqtt = require('mqtt');
var csv = require("fast-csv");

// var clientId = 'patient-02/02WXO01';
var clientId = '02WXO01';
var topic = 'stream/' + clientId;
console.log('MQTT Client Running (FROM CSV),');

var client  = mqtt.connect('mqtt://localhost:1883', { clientId : clientId }, function(err,test){
        console.log(err);
    }
);

csv
    .fromPath("samples106-default.csv")
    .on("data", function(data){
        var message = data[2] * 100 + "," + data[0];
        client.publish(topic , message.toString());
        console.log('Publish from CSV : ' + message.toString() + ", Topic : " + topic);
        sleep.usleep(3000);
    })
    .on("end", function(){
        console.log("done");
    });