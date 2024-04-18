import { handleValidation } from '../helpers/validation.helper.js';
import { userModel } from '../models/user.model.js';
import { findUser } from '../services/auth.service.js';
import { getAllUsers, updateUser } from '../services/user.service.js';
import { updateUserValidation } from '../validations/user.validation.js';

export const getUser = async (req, res) => {
  const user = await userModel.findOne(
    {
      _id: req.user.id,
    },
    'name email profilePicture'
  );
  return res
    .status(200)
    .json({ message: 'Berhasil mendapatkan data profil', user });
};

export const getUsers = async (req, res) => {
  const { name } = req.query;

  try {
    let users;

    if (name) {
      users = await userModel.find(
        { name: { $regex: name, $options: 'i' } },
        'name email profilePicture'
      );
      if (users.length === 0)
        return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    } else {
      users = await userModel.find({}, 'name email profilePicture');
    }

    return res
      .status(200)
      .json({ message: 'Berhasil mendapatkan data pengguna', users });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export const updateProfile = async (req, res) => {
  const { email } = req.body;
  const user = await findUser(email);

  if (!user)
    return res.status(404).json({ message: 'Pengguna Tidak ditemukan' });

  try {
    const validatedUser = await handleValidation(
      req,
      res,
      updateUserValidation
    );
    if (!validatedUser.success) return;

    await updateUser(user._id, req.body);

    const updatedUser = await findUser(req.body.email);

    return res.status(200).json({
      message: 'Profil kamu berhasil di perbarui',
      updatedUser,
    });
  } catch (error) {
    console.error('Internal server error:', error);
    return res.status(500).json({ message: error });
  }
};
