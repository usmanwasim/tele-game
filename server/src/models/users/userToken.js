var mongoose = require('mongoose');
const Joi = require('joi');

const userTokenSchema = mongoose.Schema({
  userId: { type: Object, required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 30 * 86400 },
});

const UserToken = mongoose.model('UserToken', userTokenSchema);

const refreshTokenBodyValidation = (body) => {
  const schema = Joi.object({
    refreshToken: Joi.string().required().label('Refresh Token'),
  });
  return schema.validate(body, { abortEarly: false });
};

module.exports.UserToken = UserToken;
module.exports.refreshTokenBodyValidation = refreshTokenBodyValidation;
