import admin from '../firebase.js';

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Invalid token:', err.message);
    res.status(403).json({ message: 'Invalid token' });
  }
};

export default verifyToken;
