import { contactModel } from '../models/contact.model.js';
import { userModel } from '../models/user.model.js';
import {
  deleteContactById,
  findContactById,
  getAllContact,
} from '../services/contact.service.js';

export const getContacts = async (request, response) => {
  const { id } = request.user;
  const data = await getAllContact(id);

  try {
    if (data?.contacts) {
      return response.status(200).json({
        message: 'Berhasil mendapatkan data kontak',
        contacts: data.contacts,
      });
    } else {
      return response.status(200).json({
        message: 'Berhasil mendapatkan data kontak',
        contacts: [],
      });
    }
  } catch (error) {
    console.error('Internal server error:', error);
    return response.status(500).json({ message: error });
  }
};

export const addContact = async (request, response) => {
  const user = request.user;
  const { id } = request.body;

  await userModel
    .findOne({
      _id: id,
    })
    .then(async () => {
      await contactModel.findOneAndUpdate(
        { user: user.id },
        { $addToSet: { contacts: id } },
        { upsert: true }
      );

      return response
        .status(201)
        .json({ message: 'Berhasil menambahkan kontak' });
    })
    .catch(() => {
      return response.status(404).json({ message: 'Pengguna tidak ditemukan' });
    });
};

export const deleteContact = async (request, response) => {
  const user = request.user;
  const { id } = request.body;

  const contactExist = await findContactById(user.id, id);

  if (!contactExist.contacts)
    return response.status(404).json({ message: 'Kontak tidak ditemukan' });

  try {
    await deleteContactById(user.id, id);

    return response.status(200).json({ message: 'Berhasil hapus kontak' });
  } catch (error) {
    console.error('Internal server error:', error);
    return response.status(500).json({ message: error });
  }
};
