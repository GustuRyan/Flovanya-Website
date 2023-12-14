const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkDuplicateUsernameorEmail = async (req, res, next) => {
  try {
    // Check for duplicate username
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    console.log('username: ', user);

    if (user) {
      return res.status(400).json({ success: false, msg: 'Username already used' });
    } else {
      // Check for duplicate email
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      console.log('email: ', user);

      if (user) {
        return res.status(400).json({ success: false, msg: 'Email already used' });
      } else {
        // Continue if no problem
        next();
      }
    }
  } catch (err) {
    console.error('checkDuplicateUsernameorEmail() error', err);
    res.status(400).json({ error: err });
  }
};

const verifyToken = (req, res, next) => {
  const token = req.session.token;
  if (!token) {
    return res.status(400).json({ success: false, msg: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    req.user = {
      id: decoded.userId,
      role: decoded.userRole,
    };
    next();
  });
};

module.exports = { checkDuplicateUsernameorEmail, verifyToken };
