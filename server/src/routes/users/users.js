const express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const crypto = require('crypto');

let {
  User,
  validateUserSignup,
  validateUserLogin,
} = require('../../models/users/user.js');
const auth = require('../../middlewares/auth');
const { generateTokens } = require('../../utils/generateTokens.js');

router.post('/signup', async (req, res) => {
  try {
    const { error } = validateUserSignup(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(400)
        .json({ error: true, message: 'User with given email already exist' });
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await user.generateHashedPassword();
    await user.save();

    return res.status(200).json({
      error: false,
      message: 'User registered sucessfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

router.delete('/delete', auth, async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(400)
        .json({ error: true, message: 'User with given email does not exist' });

    await user.deleteOne();

    return res.status(200).json({
      error: false,
      message: 'User deleted sucessfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { error } = validateUserLogin(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });
    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(401)
        .json({ error: true, message: 'Invalid email or password' });
    let isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid)
      return res
        .status(401)
        .json({ error: true, message: 'Invalid email or password' });

    const { accessToken, refreshToken } = await generateTokens(user);
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 604800000,
    });
    return res.status(200).json({
      error: false,
      role: user.role,
      accessToken,
      message: 'Logged in sucessfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

router.post('/forgotsend', async (req, res) => {
  try {
    let { email } = req.body;
    var token = crypto.randomBytes(64).toString('hex');

    let userData = await User.findOne({ email: email });
    if (!userData) {
      return res.status(400).send('Invalid Email');
    }

    userData.forgot = token;
    userData.save();

    return res.status(200).json({
      error: false,
      message: 'Email Sent Successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

router.post('/forgotverify', async (req, res) => {
  try {
    let { token, password } = req.body;

    let userData = await User.findOne({ forgot: token });
    if (!userData) {
      return res.status(400).send('Invalid Token');
    }

    userData.forgot = 'null';
    userData.password = password;
    await userData.generateHashedPassword();
    await userData.save();

    return res.status(200).json({
      error: false,
      message: 'Password Changed Successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

router.get('/getProfile', auth, async (req, res) => {
  try {
    let user = req.user;

    return res.status(200).json({
      error: false,
      user,
      message: 'User Profile',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

router.post('/editProfile', auth, async (req, res) => {
  try {
    let user = req.user;
    let { name, email, password } = req.body;

    let userData = await User.findOne({ email: user.email });

    userData.name = name;
    userData.email = email;
    if (password) {
      userData.password = password;
      await userData.generateHashedPassword();
    }

    await userData.save();

    return res.status(200).json({
      error: false,
      message: 'User Profile Updated Sucessfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

module.exports = router;
