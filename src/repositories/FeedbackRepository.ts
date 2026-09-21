import { prisma } from "../prisma";

export class FeedbackRepository {
  async create(data: {
    rating: number;
    comment: string;
    projectId: number;
  }) {
    return prisma.feedback.create({
      data,
    });
  }

  async calculateAverageRating(projectId: number) {
    const result = await prisma.feedback.aggregate({
      where: {
        projectId,
      },
      _avg: {
        rating: true,
      },
    });

    return result._avg.rating ?? 0;
  }

  async updateProjectAverage(projectId: number, averageRating: number) {
    return prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        averageRating,
      },
    });
  }
}