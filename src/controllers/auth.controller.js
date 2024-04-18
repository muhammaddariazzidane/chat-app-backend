import { createUser, findUser } from '../services/auth.service.js';
import { handleValidation } from '../helpers/validation.helper.js';
import {
  createUserValidation,
  userLoginValidation,
} from '../validations/auth.validation.js';
import jwt from 'jsonwebtoken';

export const Login = async (req, res) => {
  const { email } = req.body;
  const user = await findUser(email);

  if (!user)
    return res.status(404).json({ message: 'Pengguna Tidak ditemukan' });

  try {
    const validatedUser = await handleValidation(req, res, userLoginValidation);

    if (!validatedUser.success) return;
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        profilePicture: user?.profilePicture,
      },
      `${process.env.SECRET_KEY}`
    );
    return res.status(200).json({ message: 'Berhasil masuk', token, user });
  } catch (error) {
    console.error('Internal server error:', error);
    return res.status(500).json({ message: error });
  }
};

export const Register = async (req, res) => {
  const { email } = req.body;
  const user = await findUser(email);

  if (user) return res.json({ message: 'Pengguna Sudah Terdaftar' });

  try {
    const validatedUser = await handleValidation(
      req,
      res,
      createUserValidation
    );

    if (!validatedUser.success) return;

    await createUser(validatedUser.data);

    return res.status(201).json({
      message: 'Berhasil registrasi',
    });
  } catch (error) {
    console.error('Internal server error:', error);
    return res.status(500).json({ message: error });
  }
};
