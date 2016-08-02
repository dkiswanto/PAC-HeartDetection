/**
 * Created by g40 on 26/06/16.
 */

var sleep = require('sleep');
var mqtt = require('mqtt');
var clientId = 'kinto21';

console.log('MQTT Client Running : ' + clientId + '_phone');
var client  = mqtt.connect('mqtt://localhost:1883', {
    clientId : clientId + '_phone'
});

client.on('connect', function () {
    // TOPIC YANG DI SUBSCRIBE
    client.subscribe('stream/' + clientId + '_sensor');
});

client.on('message', function (topic, message) {
    // message is Buffer
    console.log("Message : " + message.toString());
});
