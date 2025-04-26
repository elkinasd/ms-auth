const { dynamoDB, TABLE_PROFILE } = require('../../../config/dynamoClient');
const { GetCommand } = require('@aws-sdk/lib-dynamodb');

const getProfileHandler = async (req, res) => {
    const userId = req.user?.userId;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized: Missing user ID" });
    }
    try {
        const command = new GetCommand({ TableName: TABLE_PROFILE, Key: { id: userId } });
        const data = await dynamoDB.send(command);
        if (!data.Item) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.json({
            id: data.Item.id,
            name: data.Item.name,
            email: data.Item.email,
            phone: data.Item.phone,
            document: data.Item.document,
            city: data.Item.city,
            department: data.Item.department,
            createdAt: data.Item.createdAt
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Error fetching profile data' });
    }
};

module.exports = { getProfileHandler };
