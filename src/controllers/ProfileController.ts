import { Request, Response } from "express";
import { ProfileRepository } from "../repositories/ProfileRepository";
import { CreateProfileSchema } from "../dtos/CreateProfileDto";
import { ProfileResponseDto } from "../dtos/ProfileResponseDto";

const profileRepository = new ProfileRepository();

export class ProfileController {
  async create(req: Request, res: Response) {
    try {
      const data = CreateProfileSchema.parse(req.body);

      const profile = await profileRepository.create(data);

      const response: ProfileResponseDto = {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        bio: profile.bio,
        createdAt: profile.createdAt,
      };

      return res.status(201).json(response);
    } catch (error) {
      return res.status(400).json({
        message: "Dados inválidos",
        error,
      });
    }
  }

  async findById(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "ID inválido",
      });
    }

    const profile = await profileRepository.findById(id);

    if (!profile) {
      return res.status(404).json({
        message: "Perfil não encontrado",
      });
    }

    const response: ProfileResponseDto = {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      bio: profile.bio,
      createdAt: profile.createdAt,
    };

    return res.json(response);
  }
}