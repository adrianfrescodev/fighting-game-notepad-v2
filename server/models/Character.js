import mongoose from 'mongoose';

const characterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    user: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model('Character', characterSchema);
