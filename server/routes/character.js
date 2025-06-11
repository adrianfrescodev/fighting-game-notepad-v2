import express from 'express';
import Character from '../models/Character.js';
import verifyToken from '../Auth/verifyUser.js';
import admin from '../firebase.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let userId = null;

    const header = req.headers.authorization;
    const token = header?.split('Bearer ')[1];

    if (token) {
      try {
        const decoded = await admin.auth().verifyIdToken(token);
        userId = decoded.uid;
      } catch (err) {
        console.warn('Invalid token:', err.message);
      }
    }

    const characters = await Character.find({
      $or: [{ user: null }, ...(userId ? [{ user: userId }] : [])],
    });

    res.status(200).json(characters);
  } catch (err) {
    console.error('Server error fetching characters:', err.message);
    res.status(500).json({ message: 'Error fetching characters' });
  }
});

router.post('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const { name } = req.body;
    const newCharacter = new Character({ name, user: userId });
    const savedCharacter = await newCharacter.save();
    res.status(201).json(savedCharacter);
  } catch (err) {
    console.error('Character creation error:', err.message);
    res.status(500).json({ message: 'Error creating character', error: err.message });
  }
});

router.delete('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const { _id } = req.body;
    const character = await Character.findById(_id);
    if (character && character.user?.toString() === userId) {
      await character.deleteOne();
    }
    res.status(200).json({ message: 'Character deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting character' });
  }
});

export default router;
