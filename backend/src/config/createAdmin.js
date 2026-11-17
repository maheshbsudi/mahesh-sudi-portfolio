const bcrypt = require('bcryptjs');
const Admin = require('../models/admin.model');

const createAdmin = async () => {
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;
    const name = process.env.ADMIN_NAME || 'Portfolio Admin';

    if (!email || !password) {
        throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required');
    }

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
        console.log('Admin account already exists');
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await Admin.create({
        name,
        email,
        password: hashedPassword
    });

    console.log('Initial admin account created successfully');
};

module.exports = createAdmin;