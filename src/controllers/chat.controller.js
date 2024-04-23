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

export const getMessage = async (request, response) => {
  const { id: receiver } = request.params;
  const { id: sender } = request.user;

  try {
    const chats = await findChatsBySenderAndReceiver(sender, receiver);

    return response.status(200).json({
      message: 'Berhasil mendapatkan data pesan',
      chats,
    });
  } catch (error) {
    console.error('Internal server error:', error);
    return response.status(500).json({ message: error });
  }
};
export const sendMessage = async (request, response) => {
  const { id: sender } = request.user;
  const { id: receiver } = request.params;
  const { file } = request.body;

  try {
    const validatedChat = await handleValidation(
      request,
      response,
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

    return response
      .status(201)
      .json({ message: 'Berhasil membuat pesan', newChat });
  } catch (error) {
    console.error('Internal server error:', error);
    return response.status(500).json({ message: error });
  }
};
export const updateMessage = async (request, response) => {
  const { id } = request.params;
  const payload = request.body;

  try {
    const validatedChat = await handleValidation(
      request,
      response,
      updateChatValidation
    );

    if (!validatedChat.success) return;

    await updateChatById(id, payload);

    return response.status(200).json({ message: 'berhasil edit pesan' });
  } catch (error) {
    console.error('Internal server error:', error);
    return response.status(500).json({ message: error });
  }
};
export const deleteMessage = async (request, response) => {
  const { id } = request.params;

  try {
    await deleteChatById(id);
    return response.status(200).json({ message: 'Berhasil menghapus pesan' });
  } catch (error) {
    console.error('Internal server error:', error);
    return response.status(500).json({ message: error });
  }
};
