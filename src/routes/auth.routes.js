const express = require('express');
const { check } = require('express-validator');
const { registerHandler } = require('../handlers/register');
const { loginHandler } = require('../handlers/login');
const { meHandler } = require('../handlers/me');
const { createProfileHandler, getProfileHandler, updateProfileHandler, uploadProfilePhotoHandler } = require('../handlers/profile/index');
const authMiddleware = require('../middlewares/authMiddleware');
const validateFields = require('../middlewares/validateFields');
const contactHandler = require('../handlers/contact/contact');

const router = express.Router();

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
router.get(
    '/me',
    authMiddleware,
    meHandler
);

router.post('/', contactHandler);

//Rutas del perfil
router.post('/profile', authMiddleware, createProfileHandler);
router.get('/profile', authMiddleware, getProfileHandler);
router.put('/profile', authMiddleware, updateProfileHandler);
router.post('/profile/photo', authMiddleware, uploadProfilePhotoHandler);


module.exports = router;
