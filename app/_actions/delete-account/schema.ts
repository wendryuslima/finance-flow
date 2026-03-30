import { z } from "zod";

export const deleteAccountSchema = z.object({
  id: z.string({ message: "ID invalido." }),
});

export type DeleteAccountInput = z.infer<typeof deleteAccountSchema>;
