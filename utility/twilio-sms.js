// twilio number (US) +14433554771
var accountSid = 'AC33d68c25e0ee436fb839fb0e114f7395';
var authToken = '952e0938c8c4fea7b8cbee1641bb0e26';

var client = require('twilio')(accountSid, authToken);

//Send an SMS text message
client.sendMessage({

    to:'+628983478895', // deliver to??
    // note number aktif + ada pulsa lebih
    // number must be verified in twilio console
    // https://www.twilio.com/console/phone-numbers/verified
    from: '14433554771', // twilio request number
    body: 'Hello from twilio.' // body message

}, function(err, responseData) {

    if (!err) {

        console.log(responseData.from); // outputs "+14506667788"
        console.log(responseData.body); // outputs "word to your mother."

    } else {
        console.log(err);
    }
});

module.exports = client;