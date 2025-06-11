import mongoose from 'mongoose';

const usercharacterDataSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    character: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Character',
      required: true,
    },
    favorite: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('userCharacterData', usercharacterDataSchema);
