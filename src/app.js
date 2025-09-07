require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const contactRoutes = require('./routes/contact.routes');

const app = express();

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/auth', (req, res, next) => {
    const contentType = req.headers['content-type'] || '';
    if (contentType.includes('multipart/form-data')) {
        return authRoutes(req, res, next);
    } else {
        express.json()(req, res, () => authRoutes(req, res, next));
    }
});

app.use('/contact', (req, res, next) => {
    express.json()(req, res, () => contactRoutes(req, res, next));
});

app.get('/', (req, res) => {
    res.json({ message: 'Auth service is running! 🚀' });
});



module.exports = app;
