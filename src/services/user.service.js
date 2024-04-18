import { userModel } from '../models/user.model.js';

export const getAllUsers = async () => {
  return await userModel.find({}, 'name email profilePicture');
};

export const updateUser = async (id, payload) => {
  return await userModel.findOneAndUpdate(
    {
      _id: id,
    },
    { $set: payload }
  );
};
