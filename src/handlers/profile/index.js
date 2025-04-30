const { createProfileHandler }    = require('./createProfile');
const { getProfileHandler }       = require('./getProfile');
const { updateProfileHandler }    = require('./updateProfile');
const { uploadProfilePhotoHandler } = require('./uploadProfilePhoto');

module.exports = {
  createProfileHandler,
  getProfileHandler,
  updateProfileHandler,
  uploadProfilePhotoHandler
};
