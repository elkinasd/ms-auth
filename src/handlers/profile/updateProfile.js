const { dynamoDB, TABLE_PROFILE } = require('../../../config/dynamoClient');
const { UpdateCommand } = require('@aws-sdk/lib-dynamodb');

const updateProfileHandler = async (req, res) => {
  const userId = req.user?.userId;
  const body = req.body;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: Missing user ID' });
  }

  if (!body || Object.keys(body).length === 0) {
    return res.status(400).json({ message: 'No fields provided to update' });
  }

  const updateExpression = Object.keys(body)
    .map((key) => `${key} = :${key}`)
    .join(', ');

  const expressionAttributeValues = {};
  for (const key of Object.keys(body)) {
    expressionAttributeValues[`:${key}`] = body[key];
  }

  try {
    await dynamoDB.send(new UpdateCommand({
      TableName: TABLE_PROFILE,
      Key: { id: userId },
      UpdateExpression: `set ${updateExpression}`,
      ExpressionAttributeValues: expressionAttributeValues
    }));

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};

module.exports = { updateProfileHandler };
