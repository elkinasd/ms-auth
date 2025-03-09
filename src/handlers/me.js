const { dynamoDB, TABLE_NAME } = require('../../config/dynamoClient');
const { GetCommand } = require('@aws-sdk/lib-dynamodb');

const meHandler = async (req, res) => {
    const userEmail = req.user?.userEmail;
    if (!userEmail) {
        return res.status(400).json({ message: "User email is missing in token" });
    }
    try {
        const command = new GetCommand({ TableName: TABLE_NAME, Key: { email: userEmail } });
        const data = await dynamoDB.send(command);
        if (!data.Item) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ id: data.Item.id, name: data.Item.name, email: data.Item.email, createdAt: data.Item.createdAt });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Error fetching user data' });
    }
};

module.exports = { meHandler };
