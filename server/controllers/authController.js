// server/controllers/authController.js
const jwt    = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User   = require('../models/User');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: 'Sab fields bharo' });

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: 'Email pehle se hai' });

    // ✅ Hashing yahan karo — model pe depend mat karo
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      credits: 0
    });

    res.status(201).json({
      _id:    user._id,
      name:   user.name,
      email:  user.email,
      credits: user.credits,
      token:  generateToken(user._id)
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Email aur password chahiye' });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: 'Email registered nahi hai' });

    // ✅ Direct bcrypt compare
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Password galat hai' });

    res.json({
      _id:    user._id,
      name:   user.name,
      email:  user.email,
      credits: user.credits,
      token:  generateToken(user._id)
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
};

const getMe = async (req, res) => res.json(req.user);

module.exports = { registerUser, loginUser, getMe };