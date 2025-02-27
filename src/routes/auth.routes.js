const express = require('express');
const { check } = require('express-validator');
const { registerHandler } = require('../handlers/register');
const { loginHandler } = require('../handlers/login');
const { meHandler } = require('../handlers/me');
const authMiddleware = require('../middlewares/authMiddleware');
const validateFields = require('../middlewares/validateFields');

const router = express.Router();

// Register Route
router.post(
    '/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Valid email is required').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
        validateFields
    ],
    registerHandler
);

router.post(
    '/login',
    [
        check('email', 'Valid email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        validateFields
    ],
    loginHandler
);

router.get('/me', authMiddleware, meHandler);

module.exports = router;
