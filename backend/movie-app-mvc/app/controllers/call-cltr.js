
import Twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

let TWILIO_ACCOUNT_SID='AC97583b38f7bda481449d0a04aee0a463'
let TWILIO_AUTH_TOKEN='e844f51e84069d28e03eb7003da0ba8d'
let TWILIO_PHONE_NUMBER='+18455848013'

const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
let callCltr = {};

callCltr=(req, res) => {
    const { to } = req.body; // Number to call

    client.calls.create({
        to: to,
        from: TWILIO_PHONE_NUMBER,
        url: 'http://demo.twilio.com/docs/voice.xml' // This TwiML URL is provided by Twilio for demo purposes
    })
    .then(call => res.send(`Call initiated with SID: ${call.sid}`))
    .catch(err => {
        console.error(err);
        res.status(500).send('Failed to initiate call');
    });
};


export default callCltr; 
