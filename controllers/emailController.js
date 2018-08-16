///////////////////////////////////////////////////////////////////////////////////////////
// This module is used to send messages to admininstrators if there is a serious db issue//
// or the sweep processing fails                                                         //
///////////////////////////////////////////////////////////////////////////////////////////


const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
let EmailModel = require('../models/EmailModel');

////////////////////////////////////////////////////////////////////////////
// The following module emails attendance reports to user's email address //
////////////////////////////////////////////////////////////////////////////

module.exports.sendAttendanceEmail = function (subject, message, to, fileName, callback) {

    if (process.env.EMAIL_SECURE == "true") {

        // let smtpConfig = {
        //     //host: 'smtp.mail.com',
        //     host: process.env.EMAIL_HOST,
        //     port: process.env.EMAIL_PORT,
        //     secure: process.env.EMAIL_SECURE, // use SSL
        //     auth: {
        //         user: process.env.EMAIL_USER,
        //         pass: process.env.EMAIL_PASS
        //     }
        // };
    } else {
        // let smtpConfig = {
        //     //host: 'smtp.mail.com',
        //     host: process.env.EMAIL_HOST,
        //     port: process.env.EMAIL_PORT,
        //     secure: false, // do NOT use SSL
        //     ignoreTLS: true // make sure nothing is using TLS
        // }
    }

    sgMail.setApiKey(process.env.EMAIL_PASS);
    const msg = {
        to: to,
        from: process.env.EMAIL_FROMADDR,
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg);


    // let transporter = nodemailer.createTransport(smtpConfig);

    // // setup email data with unicode symbols
    // let mailOptions = {
    //     //from: 'dragonseat@mail.com>', // sender address
    //     from: process.env.EMAIL_FROMADDR, // sender address
    //     to: to, // list of receivers
    //     subject: subject, // Subject line
    //     text: message, //
    //     //text: 'there was an error connecting to the database', //
    //     html: '<b>' + message + '</b>', // html body
    //     attachments: [
    //         {   // utf-8 string as an attachment
    //             //path: 'c:/users/bligh/dropbox/JH061617-master/DEVHEAD - Copy/Public/Reports/my_cron_file.txt'
    //             path: './Public/Reports/' + fileName


    //         }]

    // };

    // // send mail with defined transport object
    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log('Message %s sent: %s', info.messageId, info.response);
    // });
};


//////////////////////////////////////////////////////////////////////////
// Following module emails in-application incidents and alerts to mobss //
//////////////////////////////////////////////////////////////////////////

module.exports.sendIncidentEmail = function (data) {

    console.log('sendIncidentEmail called');

    let title = process.env.EMERGENCY_TITLE;

    console.log('logging data from sendIncidentEmail');
    console.log(data);

    //Loop through the unaccounted table and find their emails
    for (let i = 0; i < data.length; i++) {

        let message = `
        There is an Emergency in progress at the school. Please click the link below to confirm that you are okay. 

` + process.env.SERVER_ADDRESS + '/linkcheckin/' + data[i].EmailAddress + '/' + data[i].MusterID + `

        Please review the emergency procedures... https://emilms.fema.gov/IS360/SAFE0104230text2.htm'
        `;


        //--
        // Email report


        if (data[i].EmailAddress != "" && data[i].EmailAddress != null) {

            let to = data[i].EmailAddress;

            sgMail.setApiKey(process.env.EMAIL_PASS);
            const msg = {
                to: to,
                from: process.env.EMAIL_FROMADDR,
                subject: title,
                text: message
            };

            console.log('logging msg');
            console.log(msg);

            sgMail.send(msg);
        }
    }
};


module.exports.checkInByLink = function (req, res) {
    EmailModel.getPerson(req.params.email, function (err, getPersonResult) {
        if (err) {
            res.end();
        } else {
            EmailModel.getEvent(req.params.eventid, function (err, getEventResult) {
                if (err) {
                    res.end();
                } else {
                    let json = {
                        FirstName: getPersonResult[0].FirstName,
                        LastName: getPersonResult[0].LastName,
                        EventID: getEventResult[0].EventID,
                        EventName: getEventResult[0].EventName,
                        iClassNumber: getPersonResult[0].iClassNumber,
                        CheckInType: 4

                    }
                    EmailModel.checkIn(json, function (err, checkInResult) {
                        if (err) {
                            res.end();
                        } else {
                            res.json('Thank you, ' + getPersonResult[0].FirstName + '. You have checked in.');
                        }
                    })
                }
            })
        }
    })
}

module.exports.checkInByEmail = function (req, res) {

    let errorMessage = 'Sorry, there was an error with your request';
    let eventNotFoundMessage = 'Sorry. No event was found with that ID';
    let personNotFoundMessage = 'No file was found with that email. You have been checked in as anonymous.';

    function sendEmail(email, message) {
        let api_key = process.env.MAILGUN_KEY;
        let domain = process.env.SERVER_ADDRESS;
        let mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

        let data = {
            from: 'Mobss <mobssreply@mobsscmd.com>',
            to: email,
            subject: 'RE: Check In',
            text: message
        };

        mailgun.messages().send(data, function (error, body) {
            console.log(body);
        });
    }

    EmailModel.getPerson(req.body.sender, function (err, getPersonResult) {
        if (err) {
            sendEmail(req.body.sender, errorMessage);
            res.json(errorMessage);
        } else {
            if (getPersonResult.length > 0) {
                EmailModel.getEvent(req.body.subject, function (err, getEventResult) {
                    if (err) {
                        sendEmail(req.body.sender, errorMessage);
                        res.json(errorMessage);
                    } else {
                        if (getEventResult.length > 0) {
                            let json = {
                                FirstName: getPersonResult[0].FirstName,
                                LastName: getPersonResult[0].LastName,
                                EventID: getEventResult[0].EventID,
                                EventName: getEventResult[0].EventName,
                                iClassNumber: getPersonResult[0].iClassNumber,
                                CheckInType: 4
                            }
                            EmailModel.checkIn(json, function (err, checkInResult) {
                                if (err) {
                                    console.log('logging EmailModel.checkin err');
                                    console.log(err);
                                    sendEmail(req.body.sender, errorMessage);
                                    res.json(errorMessage);

                                } else {
                                    let message = 'Thank you, ' + getPersonResult[0].FirstName + '. You have checked in.';
                                    sendEmail(req.body.sender, message);
                                    res.json();
                                }
                            })
                        } else {
                            sendEmail(req.body.sender, eventNotFoundMessage);
                            res.json(eventNotFoundMessage);
                        }
                    }
                })
            } else {
                EmailModel.getEvent(req.body.subject, function (err, getEventResult) {
                    if (err) {
                        sendEmail(req.body.sender, errorMessage);
                        res.json(errorMessage);
                    } else {
                        if (getEventResult.length > 0) {
                            let json = {
                                FirstName: req.body.sender,
                                LastName: req.body.sender,
                                EventID: getEventResult[0].EventID,
                                EventName: getEventResult[0].EventName,
                                iClassNumber: '99999999999',
                                CheckInType: 4
                            }
                            EmailModel.checkIn(json, function (err, checkInResult) {
                                if (err) {
                                    sendEmail(req.body.sender, errorMessage);
                                    res.json(errorMessage);

                                } else {
                                    sendEmail(req.body.sender, notFoundMessage);
                                    res.json(personNotFoundMessage);
                                }
                            })
                        } else {
                            sendEmail(req.body.sender, eventNotFoundMessage);
                            res.json('Sorry. No event was found with that ID');
                        }
                    }
                })
            }


        }
    })
}



