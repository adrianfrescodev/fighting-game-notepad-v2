import express from 'express';
import Note from '../models/Note.js';
import Character from '../models/Character.js';
import verifyToken from '../Auth/verifyUser.js';

const router = express.Router();
router.get('/', verifyToken, async (req, res) => {
  try {
    const character = await Character.findOne({
      name: req.query.character,
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

router.post('/', verifyToken, async (req, res) => {
  try {
    const character = await Character.findOne({
      name: req.body.character,
      $or: [{ user: null }, { user: req.user.uid }],
    });
    if (!character) return res.status(404).json({ message: 'Character not found' });
    const newNote = new Note({
      character: character._id,
      sections: req.body.sections || undefined,
      user: req.user.uid,
    });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(500).json({ message: 'Error creating note' });
  }
});

router.patch('/', verifyToken, async (req, res) => {
  const { sectionKey, content = '' } = req.body;

  try {
    const character = await Character.findOne({
      name: req.body.character,
      $or: [{ user: null }, { user: req.user.uid }],
    });
    if (!character) return res.status(404).json({ message: 'Character not found' });
    const note = await Note.findOne({ character: character._id, user: req.user.uid });
    if (!note) return res.status(404).json({ message: 'Note not found' });

    note.sections.set(sectionKey, content);
    await note.save();

    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update note section' });
  }
});

export default router;
