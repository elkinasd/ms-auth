const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1" });
const dynamoDB = DynamoDBDocumentClient.from(client); 

const TABLE_NAME = process.env.DYNAMO_TABLE_USERS;
const TABLE_PROFILE = process.env.DYNAMO_TABLE_USERS_PROFILE;

module.exports = { dynamoDB, TABLE_NAME, TABLE_PROFILE };