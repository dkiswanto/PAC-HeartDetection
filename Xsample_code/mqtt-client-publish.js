/**
 * Created by g40 on 26/06/16.
 */
var sleep = require('sleep');
var mqtt = require('mqtt');
var clientId = 'kinto21_sensor';

console.log('MQTT Client Running,');
var client  = mqtt.connect('mqtt://localhost:1883', {
    clientId : clientId
});

client.on('connect', function () {
    var message; //integers
    while (true) {
        sleep.usleep(20000);
        message = Math.floor(Math.random() * (100-20) + 1);
        client.publish('stream/' + clientId , message.toString());
        console.log('Client ' + clientId + ' publish : ' + message);
    }
});

// client.publish('stream/' + clientId , "HELLOW");