var mongoose = require('mongoose');
const Joi = require('joi');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  forgot: { type: String, default: 'null' },
  role: {
    type: String,
    default: 'user',
  },
});

userSchema.methods.generateHashedPassword = async function () {
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
};

var User = mongoose.model('User', userSchema);

function validateUserSignup(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().min(3).max(30).required(),
    password: Joi.string().min(3).max(30).required(),
  });
  return schema.validate(data, { abortEarly: false });
}

function validateUserLogin(data) {
  const schema = Joi.object({
    email: Joi.string().email().min(3).max(30).required(),
    password: Joi.string().min(3).max(30).required(),
  });
  return schema.validate(data, { abortEarly: false });
}

module.exports.User = User;
module.exports.validateUserSignup = validateUserSignup;
module.exports.validateUserLogin = validateUserLogin;
