import { prisma } from "../prisma";

export class ProjectRepository {
  async create(data: {
    title: string;
    description?: string;
    url: string;
    profileId: number;
  }) {
    return prisma.project.create({
      data,
    });
  }

  async findAll() {
    return prisma.project.findMany({
      include: {
        technologies: true,
        feedbacks: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}