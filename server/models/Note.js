import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    character: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Character',
      required: true,
    },
    sections: {
      type: Map,
      of: String,
      default: () => ({
        general: '',
        'key-moves': '',
        combos: '',
      }),
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Note', noteSchema);
