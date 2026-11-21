
const sendContactEmail = async (contact) => {
    try {
        const response = await fetch(
            'https://api.brevo.com/v3/smtp/email',
            {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'api-key': process.env.BREVO_API_KEY,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    sender: {
                        name: 'Portfolio Contact Form',
                        email: process.env.EMAIL_FROM
                    },
                    to: [
                        {
                            email: process.env.EMAIL_TO
                        }
                    ],
                    replyTo: {
                        email: contact.email,
                        name: contact.name
                    },
                    subject: `New Portfolio Message from ${contact.name}`,
                    textContent: `
New contact form submission

Name: ${contact.name}
Email: ${contact.email}

Message:
${contact.message}
                    `
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || 'Brevo email sending failed'
            );
        }

        console.log('Brevo email sent:', result.messageId);

        return result;

    } catch (error) {
        console.error('Brevo email error:', error.message);
        throw error;
    }
};

module.exports = sendContactEmail;
