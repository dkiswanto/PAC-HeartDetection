/**
 * Created by g40 on 03/08/16.
 */

var nodemailer = require('nodemailer');

var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        // jika kalian melihat ini di github, ini sudah kadaluarsa bung
        // buat testing doang hehe..
        user: 'dede.kiswanto@gmail.com',
        pass: 'qwerty123X@'
    }
};

var transporter = nodemailer.createTransport(smtpConfig);

var mailOptions = {
    from: '"Dede Kiswanto" <dede.kiswanto@gmail.com>', // sender address
    to: 'kiswanto.d21@gmail.com', // list of receivers
    subject: 'Hello from Nodejs', // Subject line
    text: 'Hello world' // plaintext body
    // html: '<b>Hello world</b >' // html body
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});


module.exports()