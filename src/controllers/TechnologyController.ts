import { Request, Response } from "express";
import { CreateTechnologySchema } from "../dtos/CreateTechnologyDto";
import { TechnologyRepository } from "../repositories/TechnologyRepository";
import { TechnologyResponseDto } from "../dtos/TechnologyResponseDto";

const technologyRepository = new TechnologyRepository();

export class TechnologyController {
  async create(req: Request, res: Response) {
    try {
      const data = CreateTechnologySchema.parse(req.body);

      const technology = await technologyRepository.create(data);

      const response: TechnologyResponseDto = {
        id: technology.id,
        name: technology.name,
      };

      return res.status(201).json(response);
    } catch (error) {
      return res.status(400).json({
        message: "Dados inválidos",
        error,
      });
    }
  }

  async findAll(req: Request, res: Response) {
    const technologies = await technologyRepository.findAll();

    const response: TechnologyResponseDto[] = technologies.map(
      (technology) => ({
        id: technology.id,
        name: technology.name,
      })
    );

    return res.json(response);
  }
}