const bcrypt = require('bcryptjs');
const { dynamoDB, TABLE_NAME } = require('../../config/dynamoClient');
const { GetCommand } = require('@aws-sdk/lib-dynamodb');
const { generateToken } = require('../../config/jwt');

const loginHandler = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const command = new GetCommand({ TableName: TABLE_NAME, Key: { email: email.toLowerCase() } });

        const data = await dynamoDB.send(command);

        if (!data.Item) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, data.Item.passwordHash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(data.Item.id, data.Item.email);
        console.log("Token generado:", token);


        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
};

module.exports = { loginHandler };
