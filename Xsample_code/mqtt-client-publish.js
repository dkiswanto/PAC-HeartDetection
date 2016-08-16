// /**
//  * Created by g40 on 26/06/16.
//  */
var sleep = require('sleep');
var mqtt = require('mqtt');
var clientId = '02WXO01';

console.log('MQTT Client Running,');
var client  = mqtt.connect('mqtt://localhost:1883', {
    clientId : clientId
}, function(err,test){  
    console.log(err);
});

client.on('connect', function () {
    var count = 0;
    while (true) {
        var message = Math.floor(Math.random() * (100-60) + 1) + "," + count;
        client.publish('visual/' + clientId , message.toString());
        console.log('Client ' + clientId + ' publish : ' + message);
        count += 1;
        sleep.usleep(20000); //2 ms = 2000
    }
});