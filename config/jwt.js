const jwt = require('jsonwebtoken');

const generateToken = (userId, email) => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRATION || '1h';

    if (!secret) {
        throw new Error("JWT_SECRET not configured");
    }

    return jwt.sign({ userId, userEmail: email }, secret, { expiresIn });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};

module.exports = { generateToken, verifyToken };
