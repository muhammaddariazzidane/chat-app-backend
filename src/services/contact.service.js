import { contactModel } from '../models/contact.model.js';

export const getAllContact = async (id) => {
  return await contactModel
    .findOne({ user: id })
    .populate('contacts', 'name email profilePicture');
};

export const findContactById = async (userId, contactUserId) => {
  return await contactModel.findOne(
    { user: userId },
    { contacts: contactUserId }
  );
};

export const deleteContactById = async (userId, contactUserId) => {
  return await contactModel.updateOne(
    { user: userId },
    { $pull: { contacts: contactUserId } }
  );
};
