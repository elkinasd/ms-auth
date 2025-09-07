const express = require('express');
const router = express.Router();
const contactHandler = require('../handlers/contact/contact');

router.post('/', contactHandler);

module.exports = router;
