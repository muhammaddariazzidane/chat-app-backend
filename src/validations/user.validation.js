import { z } from 'zod';

export const updateUserValidation = async (payload) => {
  return await z
    .object({
      name: z.string(),
    })
    .required()
    .safeParseAsync(payload);
};
