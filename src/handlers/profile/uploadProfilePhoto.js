const multer = require('multer');
const { uploadToS3 } = require('../utils/s3');
const { dynamoDB, TABLE_PROFILE } = require('../../../config/dynamoClient');
const { UpdateCommand } = require('@aws-sdk/lib-dynamodb');

const upload = multer({ storage: multer.memoryStorage() });

async function uploadProfilePhotoHandler(req, res) {
  upload.single('photo')(req, res, async err => {
    if (err) {
      console.error('Error multer:', err);
      return res.status(500).json({ message: 'Error procesando archivo' });
    }

    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No se subió ninguna foto' });
    }

    const validMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validMimeTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ message: 'Formato de archivo no soportado' });
    }

    try {
      const photoUrl = await uploadToS3(req.file);
      await dynamoDB.send(new UpdateCommand({
        TableName: TABLE_PROFILE,
        Key: { id: userId },
        UpdateExpression: 'SET photoUrl = :url',
        ExpressionAttributeValues: {
          ':url': photoUrl
        }
      }));

      return res.json({ photoUrl });
    } catch (e) {
      console.error('🔥 Error subiendo la foto:', e);
      return res.status(500).json({
        message: 'Error subiendo la foto a S3',
        error: e.message,
        details: e.stack
      });
    }
  });
}

module.exports = { uploadProfilePhotoHandler };
