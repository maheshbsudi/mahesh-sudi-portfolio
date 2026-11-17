const Contact = require('../models/contact.model');
const { sendContactNotification } = require('../utils/sendEmail');

const createContact = async (req, res) => {
    try {
        const name = String(req.body.name || '').trim();
        const email = String(req.body.email || '').trim().toLowerCase();
        const subject = String(req.body.subject || '').trim();
        const message = String(req.body.message || '').trim();

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        if (name.length > 100 || email.length > 254 ||
            subject.length > 200 || message.length > 5000) {
            return res.status(400).json({
                success: false,
                message: 'One or more fields exceed the allowed length'
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        // Save the message first. Email failure must not lose the message.
        const contact = await Contact.create({
            name,
            email,
            subject,
            message
        });

        let emailSent = true;

        try {
            await sendContactNotification(contact);
        } catch (emailError) {
            emailSent = false;
            console.error('Email notification failed:', emailError.message);
        }

        return res.status(201).json({
            success: true,
            message: 'Your message has been submitted successfully',
            emailSent
        });

    } catch (error) {
        console.error('Contact submission error:', error);

        return res.status(500).json({
            success: false,
            message: 'Unable to submit your message. Please try again.'
        });
    }
};

module.exports = { createContact };