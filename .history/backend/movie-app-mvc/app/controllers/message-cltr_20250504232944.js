
import Twilio from 'twilio';

let TWILIO_ACCOUNT_SID='AC97583b38f7bda481449d0a04aee0a463'
let TWILIO_AUTH_TOKEN='e844f51e84069d28e03eb7003da0ba8d'
let TWILIO_PHONE_NUMBER='+18455848013'

const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
// POST endpoint to send a message
 const sendMessage= (req, res) => {
    const { number, message } = req.body;
    client.messages
      .create({
        body: message,
        to: number,
        from :'+18455848013',
      })
      .then((message) => {
        console.log("succ iun messege twilio")
        res.status(200).send({ success: true, messageSid: message.sid });
      })
      .catch((err) => {
        console.log("err in message twiolio",err)
        res.status(500).send({ success: false, error: err.message });
      });
  };
 
export default sendMessage


/*TWILIO_ACCOUNT_SID=ACe79a117ac75413e521cbbe27f1341035
TWILIO_AUTH_TOKEN=045c55a4db8d94c9422488007f0c6c02
TWILIO_PHONE_NUMBER=+16503833663*/