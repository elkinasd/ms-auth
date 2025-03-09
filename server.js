require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;
const authRoutes = require('./src/routes/auth.routes');

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Auth service is running! 🚀' });
});

app.listen(PORT, () => {
    console.log(`Auth service running at http://localhost:${PORT}`);
});

//Start server yarn start dev