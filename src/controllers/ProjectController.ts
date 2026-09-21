import { Request, Response, NextFunction } from "express";
import { CreateProjectSchema } from "../dtos/CreateProjectDto";
import { ProjectRepository } from "../repositories/ProjectRepository";
import { ProjectResponseDto } from "../dtos/ProjectResponseDto";

const projectRepository = new ProjectRepository();

export class ProjectController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
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
      next(error);
    }
  }

  async findAll(req: Request, res: Response) {
    const technology =
      typeof req.query.technology === "string"
        ? req.query.technology
        : undefined;

    const page =
      typeof req.query.page === "string"
        ? Number(req.query.page)
        : 1;

    const limit =
      typeof req.query.limit === "string"
        ? Number(req.query.limit)
        : 10;

    const projects = await projectRepository.findAll(
      technology,
      page,
      limit
    );

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

  async upvote(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (!id) {
        return res.status(400).json({
          message: "ID do projeto é obrigatório."
        });
      }

      const project = await projectRepository.upvote(id);

      return res.json({
        message: "Upvote registrado com sucesso.",
        upvotes: project.upvotes
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Erro ao registrar upvote."
      });
    }
  }
}