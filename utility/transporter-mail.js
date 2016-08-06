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

// sample usage send
// transporter.sendMail(mailOptions, function(error, info){
//     if(error){
//         return console.log(error);
//     }
//     console.log('Message sent: ' + info.response);
// });


module.exports = transporter;