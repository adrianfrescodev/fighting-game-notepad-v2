import express from 'express';
import Character from '../models/Character.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const notes = await Character.find();
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching characters' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newCharacter = new Character({ name: req.body.name });
    const savedNote = await newCharacter.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(500).json({ message: 'Error creating character' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Character.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Character deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting character' });
  }
});

export default router;
