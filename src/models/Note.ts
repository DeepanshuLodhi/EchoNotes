import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['text', 'audio'],
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  imageUrl: String,
}, { timestamps: true });

export const Note = mongoose.models.Note || mongoose.model('Note', noteSchema);