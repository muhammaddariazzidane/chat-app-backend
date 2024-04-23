import { handleValidation } from '../helpers/validation.helper.js';
import { userModel } from '../models/user.model.js';
import { findUser } from '../services/auth.service.js';
import { getAllUsers, updateUser } from '../services/user.service.js';
import { updateUserValidation } from '../validations/user.validation.js';

export const getUser = async (request, response) => {
  try {
    const user = await findUser(request.user.email);
    return response
      .status(200)
      .json({ message: 'Berhasil mendapatkan data profil', user });
  } catch (error) {
    console.error('Internal server error:', error);
    return response.status(500).json({ message: error });
  }
};

export const getUsers = async (_, response) => {
  try {
    const users = await getAllUsers();
    return response
      .status(200)
      .json({ message: 'Berhasil mendapatkan data pengguna', users });
  } catch (error) {
    console.error('Internal server error:', error);
    return response.status(500).json({ message: error });
  }
};

export const updateProfile = async (request, response) => {
  const { email } = request.body;
  const user = await findUser(email);

  if (!user)
    return response.status(404).json({ message: 'Pengguna Tidak ditemukan' });
  try {
    const validatedUser = await handleValidation(
      request,
      response,
      updateUserValidation
    );
    if (!validatedUser.success) return;

    await updateUser(user._id, request.body);

    const updatedUser = await findUser(request.body.email);

    return response.status(200).json({
      message: 'Profil kamu berhasil di perbarui',
      updatedUser,
    });
  } catch (error) {
    console.error('Internal server error:', error);
    return response.status(500).json({ message: error });
  }
};
