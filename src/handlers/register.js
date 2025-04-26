const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { dynamoDB, TABLE_NAME } = require('../../config/dynamoClient');
const { PutCommand } = require('@aws-sdk/lib-dynamodb');
const { generateToken } = require('../../config/jwt');
const User = require('../models/User');

const registerHandler = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    const newUser = new User({
        id: userId,
        name,
        email: email.toLowerCase(),
        passwordHash: hashedPassword,
        createdAt: new Date().toISOString()
    });

    try {
        await dynamoDB.send(new PutCommand({ TableName: TABLE_NAME, Item: newUser }));
        
        const token = generateToken(userId, email);

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
};

module.exports = { registerHandler };
