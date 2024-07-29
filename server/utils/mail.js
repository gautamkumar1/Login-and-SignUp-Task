const net = require('net');
const tls = require('tls');

const SMTP_SERVER = 'smtp.gmail.com'; 
const SMTP_PORT = 587; 
const SMTP_USERNAME = 'gautamkum4r@gmail.com'; 
const SMTP_PASSWORD = 'g@utam11'; 

function sendMail({ from, to, subject, text }) {
    return new Promise((resolve, reject) => {
        let client = net.createConnection(SMTP_PORT, SMTP_SERVER, () => {
            client.write('EHLO smtp.gmail.com\r\n');
            client.write('AUTH LOGIN\r\n');
            client.write(Buffer.from(SMTP_USERNAME).toString('base64') + '\r\n');
            client.write(Buffer.from(SMTP_PASSWORD).toString('base64') + '\r\n');
            client.write(`MAIL FROM: <${from}>\r\n`);
            client.write(`RCPT TO: <${to}>\r\n`);
            client.write('DATA\r\n');
            client.write(`Subject: ${subject}\r\n`);
            client.write(`\r\n${text}\r\n.\r\n`);
            client.write('QUIT\r\n');
        });

        client.on('data', (data) => {
            console.log('Message received from SMTP server:', data.toString());
        });

        client.on('end', () => {
            resolve();
        });

        client.on('error', (err) => {
            reject(err);
        });
    });
}



module.exports = { sendMail };
