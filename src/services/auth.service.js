import { userModel } from '../models/user.model.js';
import { hash } from 'bcrypt';

export const createUser = async (payload) => {
  const hashedPassword = await hash(payload.password, 10);

  return await userModel.create({
    email: payload.email,
    name: payload.name,
    password: hashedPassword,
    profilePicture: payload.profilePicture
      ? payload.profilePicture
      : `https://api.multiavatar.com/${payload.name}.svg?apikey=${process.env.AVATAR_API_KEY}`,
  });
};

export const findUser = async (email) => {
  return await userModel.findOne(
    {
      email,
    },
    'name email profilePicture'
  );
};
