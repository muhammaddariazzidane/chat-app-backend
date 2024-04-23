import { z } from 'zod';

export const updateUserValidation = async (payload) => {
  return await z
    .object({
      name: z.string(),
      email: z.string(),
      profilePicture: z.string().url().min(2),
    })
    .required()
    .safeParseAsync(payload);
};
