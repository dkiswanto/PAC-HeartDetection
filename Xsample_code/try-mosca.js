/**
 * Created by g40 on 26/06/16.
 */

var mosca = require('mosca');
var mqtt = require('mqtt');
var sleep = require('sleep');


var ascoltatore = {
    //using ascoltatore
    type: 'mongo',
    url: 'mongodb://localhost:27017/mqtt',
    pubsubCollection: 'ascoltatori',
    mongo: {}
};

var settings = {
    port: 1883
    // backend: ascoltatore
};

var server = new mosca.Server(settings);

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
    console.log('Published', packet.payload);
});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running');
}


//-----------------------------------------//
// Sample mqtt client using js

// var client  = mqtt.connect('mqtt://localhost:1883');
//
// client.on('connect', function () {
//     while (true) {
//         sleep.sleep(2);
//         client.publish('presence', 'Hello mqtt');
//     }
// });
