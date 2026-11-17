const express = require('express');
const rateLimit = require('express-rate-limit');

const {
    adminLogin,
    getContacts,
    markContactAsRead
} = require('../controllers/admin.controller');

const protectAdmin = require('../middlewares/auth.middleware');

const router = express.Router();

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false
});

router.post('/login', loginLimiter, adminLogin);

// All routes below this line require a valid admin JWT.
router.use(protectAdmin);

router.get('/contacts', getContacts);
router.patch('/contacts/:id/read', markContactAsRead);

module.exports = router;