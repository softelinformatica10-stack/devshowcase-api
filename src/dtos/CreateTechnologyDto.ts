import { z } from "zod";

export const CreateTechnologySchema = z.object({
  name: z.string().trim().min(1, "Nome da tecnologia é obrigatório"),
});

export type CreateTechnologyDto = z.infer<typeof CreateTechnologySchema>;