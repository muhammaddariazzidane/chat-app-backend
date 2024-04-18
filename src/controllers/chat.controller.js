import {
  createChat,
  deleteChatById,
  findChatsBySenderAndReceiver,
  updateChatById,
} from '../services/chat.service.js';
import {
  createChatValidation,
  updateChatValidation,
} from '../validations/chat.validation.js';
import { handleValidation } from '../helpers/validation.helper.js';

export const getMessage = async (req, res) => {
  const { id: receiver } = req.params;
  const { id: sender } = req.user;

  try {
    const chats = await findChatsBySenderAndReceiver(sender, receiver);

    return res.status(200).json({
      message: 'Berhasil mendapatkan data pesan',
      chats,
    });
  } catch (error) {
    console.error('Internal server error:', error);
    return res.status(500).json({ message: error });
  }
};
export const sendMessage = async (req, res) => {
  const { id: sender } = req.user;
  const { id: receiver } = req.params;
  const { file } = req.body;

  try {
    const validatedChat = await handleValidation(
      req,
      res,
      createChatValidation
    );

    if (!validatedChat.success) return;

    const newChat = {
      sender,
      receiver,
      message: validatedChat.data.message,
      file: file ? file : null,
    };
    await createChat(newChat);

    return res.status(201).json({ message: 'Berhasil membuat pesan', newChat });
  } catch (error) {
    console.error('Internal server error:', error);
    return res.status(500).json({ message: error });
  }
};
export const updateMessage = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    const validatedChat = await handleValidation(
      req,
      res,
      updateChatValidation
    );

    if (!validatedChat.success) return;

    await updateChatById(id, payload);

    return res.status(200).json({ message: 'berhasil edit pesan' });
  } catch (error) {
    console.error('Internal server error:', error);
    return res.status(500).json({ message: error });
  }
};
export const deleteMessage = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteChatById(id);
    return res.status(200).json({ message: 'Berhasil menghapus pesan' });
  } catch (error) {
    console.error('Internal server error:', error);
    return res.status(500).json({ message: error });
  }
};
