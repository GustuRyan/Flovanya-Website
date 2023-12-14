const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signUp = (req, res) => {
  // Create user
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    role: req.body.role,
  })
    .then((user) => {
      res.status(200).json({ success: true, data: user });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ success: false, error: err });
    });
};

const signIn = (req, res) => {
  // Find user with email
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      // Validate password
      bcrypt
        .compare(req.body.password, user.password)
        .then((isMatch) => {
          // If password wrong, throw error
          if (!isMatch) {
            return res.status(400).json({ success: false, msg: 'Wrong password' });
          }
          // Sign token
          var token = jwt.sign({ userId: user.id, userRole: user.role }, process.env.JWTSECRET, {
            expiresIn: '1h',
          });

          req.session.token = token;
          res.status(200).json({ success: true, data: token });
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ success: false, error: err });
    });
};

const signOut = async (req, res) => {
  try {
    req.session = null;
    res.status(200).json({ success: true, msg: 'Sign out success' });
  } catch (err) {
    console.error('Fail to sign out', err);
    res.status(400).json({ success: false, msg: 'Sign out failed' });
  }
};

module.exports = { signIn, signUp, signOut };
