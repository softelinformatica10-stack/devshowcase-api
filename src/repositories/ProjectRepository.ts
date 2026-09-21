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

async findAll(
  technology?: string,
  page: number = 1,
  limit: number = 10
) {
  const skip = (page - 1) * limit;

  return prisma.project.findMany({
    where: technology
      ? {
          technologies: {
            some: {
              name: {
                equals: technology,
                mode: "insensitive",
              },
            },
          },
        }
      : undefined,

    include: {
      technologies: true,
      feedbacks: true,
    },

    orderBy: {
      createdAt: "desc",
    },

    skip,
    take: limit,
  });
}

  async upvote(id: number) {
    return prisma.project.update({
      where: {
        id,
      },
      data: {
        upvotes: {
          increment: 1,
        },
      },
    });
  }
}