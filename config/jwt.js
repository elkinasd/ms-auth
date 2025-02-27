const jwt = require('jsonwebtoken');

const generateToken = (userId, email) => {
    return jwt.sign({ userId: userId, userEmail: email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
};


const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};

module.exports = { generateToken, verifyToken };
