const { dynamoDB, TABLE_PROFILE } = require('../../../config/dynamoClient');
const { PutCommand } = require('@aws-sdk/lib-dynamodb');
const UserProfile = require('../../models/UserProfile');

const createProfileHandler = async (req, res) => {
    const { name, email, phone, document, city, department } = req.body;
    const userId = req.user?.userId;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: Missing user ID' });
    }

    if (!name || !email) {
        return res.status(400).json({ message: 'The name and email are required' });
    }

    const newProfile = new UserProfile(
        userId,
        name,
        email,
        phone,
        document,
        city,
        department
    );

    try {
        await dynamoDB.send(new PutCommand({ TableName: TABLE_PROFILE, Item: newProfile }));
        res.status(201).json({ message: 'Complementary information saved successfully' });
    } catch (error) {
        console.error('Error saving complementary information:', error);
        res.status(500).json({ message: 'Error saving complementary information' });
    }
};

module.exports = { createProfileHandler };
