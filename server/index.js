const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
require('dotenv').config();

const db = require('./config/db');
const User = require('./models/user');
const Event = require('./models/event');
const { signIn, signUp, signOut } = require('./controllers/authController');
const { checkDuplicateUsernameorEmail, verifyToken } = require('./middlewares/authMiddleware');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(
  cookieSession({
    name: 'session',
    secret: process.env.SECRET,
  })
);

// API routes
app.get('/app/:id', verifyToken, (req, res) => {
  res.send('This is app');
});
app.post('/app/login', signIn);
app.post('/app/register', checkDuplicateUsernameorEmail, signUp);
app.post('/app/logout', signOut);

// Port
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
