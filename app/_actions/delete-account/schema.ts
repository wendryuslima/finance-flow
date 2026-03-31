import { z } from "zod";

export const deleteAccountSchema = z.object({
  id: z.string({ message: "ID inválido." }),
});

export type DeleteAccountInput = z.infer<typeof deleteAccountSchema>;
