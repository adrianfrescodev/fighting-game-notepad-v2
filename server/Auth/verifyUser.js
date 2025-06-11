import admin from '../firebase.js';

const verifyToken = async (req, res, next) => {
  const header = req.headers.authorization;
  const token = header?.split('Bearer ')[1];

  if (!token) {
    console.warn('No token provided in Authorization header');
    return res.status(401).json({ message: 'Unauthorized: No token' });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = { uid: decoded.uid };
    next();
  } catch (err) {
    console.error('verifyIdToken failed:', err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default verifyToken;
