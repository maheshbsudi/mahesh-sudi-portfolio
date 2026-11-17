
const jwt = require('jsonwebtoken');

const protectAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log('========== ADMIN AUTH DEBUG ==========');
    console.log('Request URL:', req.originalUrl);
    console.log('Authorization header exists:', !!authHeader);
    console.log('Bearer prefix valid:', authHeader?.startsWith('Bearer '));
    console.log('JWT secret configured:', !!process.env.JWT_SECRET);
    console.log('======================================');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = decoded;

    console.log('Admin authenticated:', decoded.email);

    next();

  } catch (error) {
    console.error('JWT verification error:', error.message);

    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

module.exports = protectAdmin;
