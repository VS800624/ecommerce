const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    console.log("No token provided in request");
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
  try {
    console.log("Verifying token:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT payload:", decoded);
    req.userId = decoded.userId || decoded.id;
    if (!req.userId) {
      console.log("No userId or id in JWT payload:", decoded);
      return res.status(401).json({ message: 'Invalid token: No user ID in payload' });
    }
    console.log("Authenticated userId:", req.userId);
    next();
  } catch (err) {
    console.error("JWT verification error:", err.message, err);
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token: Verification failed' });
    }
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Invalid token: Token expired' });
    }
    res.status(401).json({ message: 'Invalid token' });
  }
};