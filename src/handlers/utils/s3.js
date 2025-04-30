const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const s3 = new S3Client({ region: process.env.AWS_REGION });

async function uploadToS3(file) {
  const key = `profiles/${Date.now()}_${file.originalname}`;
  await s3.send(new PutObjectCommand({
    Bucket: process.env.S3_IMAGE_PROFILE,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  }));
  return `https://${process.env.S3_IMAGE_PROFILE}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}

module.exports = { uploadToS3 };
