import { z } from "zod";

export const CreateProjectSchema = z.object({
  title: z.string().trim().min(1, "Título é obrigatório"),
  description: z.string().trim().optional(),
  url: z.string().trim().url("URL inválida"),
  profileId: z.number().int().positive("profileId deve ser um número positivo"),
});

export type CreateProjectDto = z.infer<typeof CreateProjectSchema>;