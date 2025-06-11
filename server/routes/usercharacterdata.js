import express from 'express';
import userCharacterData from '../models/UserCharacterData.js';
import verifyToken from '../Auth/verifyUser.js';
import Character from '../models/Character.js';
const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  try {
    const settings = await userCharacterData.find({ user: req.user.uid });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching settings' });
  }
});
router.patch('/restore-all', verifyToken, async (req, res) => {
  try {
    const result = await userCharacterData.updateMany(
      { user: req.user.uid, deleted: true },
      { $set: { deleted: false } }
    );

    res.status(200).json({ message: 'All characters restored', modified: result.modifiedCount });
  } catch (err) {
    res.status(500).json({ message: 'Failed to restore characters' });
  }
});
router.patch('/:character', verifyToken, async (req, res) => {
  try {
    const { favorite, deleted } = req.body;
    const character = await Character.findOne({
      name: req.params.character,
      $or: [{ user: null }, { user: req.user.uid }],
    });
    if (!character) return res.status(404).json({ message: 'Character not found' });

    const updated = await userCharacterData.findOneAndUpdate(
      { character: character._id, user: req.user.uid },
      { ...(favorite !== undefined && { favorite }), ...(deleted !== undefined && { deleted }) },
      { new: true, upsert: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update settings' });
  }
});

export default router;
