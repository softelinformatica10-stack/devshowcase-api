import { prisma } from "../prisma";

export class TechnologyRepository {
  async create(data: {
    name: string;
  }) {
    return prisma.technology.create({
      data,
    });
  }

  async findAll() {
    return prisma.technology.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }
}