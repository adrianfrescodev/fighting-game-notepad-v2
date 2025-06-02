import express from 'express';
import Note from '../models/Note.js';
import Character from '../models/Character.js';

const router = express.Router();
router.get('/', async (req, res) => {
  try {
    const character = await Character.findOne({ name: req.query.character });
    const note = await Note.findOne({ character: character._id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching note' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching note' });
  }
});

router.post('/', async (req, res) => {
  try {
    const character = await Character.findOne({ name: req.body.character });
    if (!character) return res.status(404).json({ message: 'Character not found' });
    const newNote = new Note({
      character: character._id,
      sections: req.body.sections || undefined,
    });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(500).json({ message: 'Error creating note' });
  }
});

router.patch('/:id', async (req, res) => {
  const { sectionKey, content = '' } = req.body;

  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    note.sections.set(sectionKey, content);
    await note.save();

    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update note section' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting note' });
  }
});

export default router;
