import { chatModel } from '../models/chat.model.js';

export const createChat = async (payload) => {
  return await chatModel.create(payload);
};

export const updateChatById = async (id, payload) => {
  return await chatModel.findOneAndUpdate(
    {
      _id: id,
    },
    { $set: payload }
  );
};

export const findChatsBySenderAndReceiver = async (sender, receiver) => {
  return await chatModel
    .find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    })
    .populate('sender', 'name email profilePicture')
    .populate('receiver', 'name email profilePicture');
};
export const deleteChatById = async (id) => {
  return await chatModel.findOneAndDelete({
    _id: id,
  });
};
