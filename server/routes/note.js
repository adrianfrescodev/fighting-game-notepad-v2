import express from 'express';
import Note from '../models/Note.js';
import Character from '../models/Character.js';
import verifyToken from '../Auth/verifyUser.js';

const router = express.Router();
router.get('/:character', verifyToken, async (req, res) => {
  try {
    const character = await Character.findOne({
      name: req.params.character,
      $or: [{ user: null }, { user: req.user.uid }],
    });
    if (!character) return res.status(404).json({ message: 'Character not found' });

    const note = await Note.findOne({ character: character._id, user: req.user.uid });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching note' });
  }
});

router.patch('/:character', verifyToken, async (req, res) => {
  try {
    const character = await Character.findOne({
      name: req.params.character,
      $or: [{ user: null }, { user: req.user.uid }],
    });
    if (!character) return res.status(404).json({ message: 'Character not found' });

    const note = await Note.findOneAndUpdate(
      { character: character._id, user: req.user.uid },
      { sections: req.body.sections },
      { new: true, upsert: true }
    );
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update note section' });
  }
});

export default router;
