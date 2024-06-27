const jwt = require('jsonwebtoken');

// Secret key for signing JWT tokens
const JWT_SECRET = process.env.JWT_SECRET;

const User = require('../models/User');

// Helper function to generate JWT token
const generateToken = (user) => {
  const payload = { userId: user.id, username: user.username };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1hr' });
};

// Authentication middleware
const authenticate = (req, res, next) => {
  if (req.method === 'GET' && (req.path === '/' || req.path.startsWith('/'))) {
    return next();
  }
  console.log('auth innnnnnnnnnnnn')
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("innnnnn")
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
  }
  return res.status(401).json({ message: 'Invalid token' });
  }
};

// Login route
const Login1 = async (req, res) => {
  const { username, password } = req.body;

  console.log('Received login request for user:', username);

  try {
    // Find user with the provided username
    const user = await User.findOne({ username });

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare passwords directly without hashing
    const isPasswordValid = password === user.password;
    console.log('isPasswordValid:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('Invalid password');
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    console.log('Password is valid');

    // Generate and send JWT token
    const token = generateToken(user);
    console.log('Generated token:', token);

    // Send the token in the response
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { authenticate, Login1 };
