import { Request, Response } from "express";
import { CreateProjectSchema } from "../dtos/CreateProjectDto";
import { ProjectRepository } from "../repositories/ProjectRepository";
import { ProjectResponseDto } from "../dtos/ProjectResponseDto";

const projectRepository = new ProjectRepository();

export class ProjectController {
  async create(req: Request, res: Response) {
    try {
      const data = CreateProjectSchema.parse(req.body);

      const project = await projectRepository.create(data);

      const response: ProjectResponseDto = {
        id: project.id,
        title: project.title,
        description: project.description,
        url: project.url,
        profileId: project.profileId,
        createdAt: project.createdAt,
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
    const projects = await projectRepository.findAll();

    const response: ProjectResponseDto[] = projects.map((project) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      url: project.url,
      profileId: project.profileId,
      createdAt: project.createdAt,
    }));

    return res.json(response);
  }
}