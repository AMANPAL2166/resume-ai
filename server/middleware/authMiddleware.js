const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;
  
    if (req.headers.authorization?.startsWith('Bearer')) {
      try {
        token = req.headers.authorization.split(' ')[1];
  
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
        req.user = await User.findById(decoded.id).select('-password');
  
        return next(); // ✅ IMPORTANT
      } catch (error) {
        return res.status(401).json({ message: 'Token invalid hai, login karo' });
      }
    }
  
    return res.status(401).json({ message: 'Token nahi mila, unauthorized' });
  };
module.exports = { protect };