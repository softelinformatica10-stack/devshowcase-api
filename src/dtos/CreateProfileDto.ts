import { z } from "zod";

export const CreateProfileSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório"),
  email: z.string().trim().email("E-mail inválido"),
  bio: z.string().trim().optional(),
});

export type CreateProfileDto = z.infer<typeof CreateProfileSchema>;