import { z } from 'zod';

export const createContactValidation = async (payload) => {
  return await z
    .object({
      user: z.string(),
      email: z.string(),
      profilePicture: z.string().url().min(2),
    })
    .required()
    .safeParseAsync(payload);
};
