require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');
const createAdmin = require('./config/createAdmin');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is missing in .env');
        }

        await connectDB();
        await createAdmin();

        app.listen(PORT, () => {
            console.log(`Backend server running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Server startup failed:', error.message);
        process.exit(1);
    }
};
require('dotenv').config();

const { testEmailConnection } = require('./utils/sendEmail');

testEmailConnection();

startServer();