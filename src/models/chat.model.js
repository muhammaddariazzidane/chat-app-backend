import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      default: null,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const chatModel = mongoose.model('Chat', chatSchema);
