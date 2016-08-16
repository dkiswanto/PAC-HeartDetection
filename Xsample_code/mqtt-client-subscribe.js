/**
 * Created by g40 on 26/06/16.
 */

var sleep = require('sleep');
var mqtt = require('mqtt');
var clientId = '02WXO01';

console.log('MQTT Client Running : ' + clientId + '_phone');
var client  = mqtt.connect('mqtt://localhost:1883', {
    clientId : clientId
});

client.on('connect', function () {
    // TOPIC YANG DI SUBSCRIBE
    client.subscribe('visual/02WXO01');
});

client.on('message', function (topic, message) {
    // message is Buffer
    console.log("Message : " + message.toString());
});
