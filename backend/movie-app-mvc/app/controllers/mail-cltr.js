import nodemailer from 'nodemailer'

let EMAIL_ADDRESS='gnanaprasuna.gannavaram@gmail.com'
let EMAIL_PASSWORD='pxfm ughq ublu illr'

const sendEmail = async (req, res) => {
    const { to, subject, text } = req.body;

    console.log('Received email request:', { to, subject, text });

    // Validate input data
    if (!to || !subject || !text) {
        console.error('Missing required email fields.');
        return res.status(400).json({ error: 'Please provide to, subject, and text fields.' });
    }

    // Configure transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_ADDRESS, // Your email address
            pass: EMAIL_PASSWORD // Your app-specific password
        }
    });

    // Email options
    let mailOptions = {
        from: EMAIL_ADDRESS,
        to: to,
        subject: subject,
        text: text
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info);
        res.status(200).json({ message: 'Email sent successfully', info: info });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
};

export default  sendEmail 
