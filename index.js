require('dotenv').config()

const nodemailer = require('nodemailer')
const pug = require('pug')

// Step 1: Configure transporter with GMAIL credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD
    }
})

function sendEmail(to, subject, template, data) {
    const mailOptions = {
        from: 'email@domain.com',
        to,
        subject,
        html: pug.renderFile(__dirname + '/views/' + template + '.pug', data)
    }

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log('Error: ', err)
        } else {
            console.log('Message sent successfully!')
        }
    })
}

sendEmail('email@domain.com', 'Dynamic Email Template with Pug', 'anotherMessage', { accessCode: '123456' })
// sendEmail('email@domain.com', 'Dynamic Email Template with Pug', 'welcomeMessage', { userName: 'John Doe' })