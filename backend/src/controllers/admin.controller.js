
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Admin = require('../models/admin.model');
const Contact = require('../models/contact.model');

// ======================================
// ADMIN LOGIN
// ======================================
const adminLogin = async (req, res) => {
    try {
        const email = String(req.body.email || '')
            .trim()
            .toLowerCase();

        const password = String(req.body.password || '');

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is missing');

            return res.status(500).json({
                success: false,
                message: 'Server configuration error'
            });
        }

        const admin = await Admin.findOne({ email })
            .select('+password');

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            admin.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const token = jwt.sign(
            {
                adminId: admin._id.toString(),
                email: admin.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || '1d'
            }
        );

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            admin: {
                name: admin.name,
                email: admin.email
            }
        });

    } catch (error) {
        console.error('Admin login error:', error);

        return res.status(500).json({
            success: false,
            message: 'Unable to log in'
        });
    }
};


// ======================================
// GET ALL CONTACT MESSAGES
// ======================================
const getContacts = async (req, res) => {
    try {
        console.log('GET CONTACTS CONTROLLER EXECUTED');

        // Disable browser and intermediary caching
        res.set({
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            'Surrogate-Control': 'no-store'
        });

        // Fetch all contact messages from MongoDB
        const contacts = await Contact.find()
            .sort({ createdAt: -1 })
            .select('-__v')
            .lean();

        console.log('MongoDB contacts count:', contacts.length);

        return res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts
        });

    } catch (error) {
        console.error('Get contacts error:', error);

        return res.status(500).json({
            success: false,
            message: 'Unable to retrieve messages'
        });
    }
};


// ======================================
// MARK CONTACT MESSAGE AS READ
// ======================================
const markContactAsRead = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status: 'Read' },
            {
                new: true,
                runValidators: true
            }
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Message not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Message marked as read',
            data: contact
        });

    } catch (error) {
        console.error('Mark as read error:', error);

        return res.status(500).json({
            success: false,
            message: 'Unable to update message'
        });
    }
};


module.exports = {
    adminLogin,
    getContacts,
    markContactAsRead
};
