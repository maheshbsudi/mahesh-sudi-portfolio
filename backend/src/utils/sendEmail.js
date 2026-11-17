const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const sendContactNotification = async (contact) => {
    return transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
        to: process.env.NOTIFICATION_EMAIL,
        replyTo: contact.email,
        subject: `New portfolio message: ${contact.subject}`,
        text: `
You have received a new message through your portfolio.

Name: ${contact.name}
Email: ${contact.email}
Subject: ${contact.subject}

Message:
${contact.message}

Submitted: ${contact.createdAt}
        `
    });
};

const testEmailConnection = async () => {
    try {
        await transporter.verify();
        console.log('SMTP connection successful!');
    } catch (error) {
        console.error('SMTP connection failed:', error);
    }
};

module.exports = {
    sendContactNotification,
    testEmailConnection
};

// module.exports = { sendContactNotification };

