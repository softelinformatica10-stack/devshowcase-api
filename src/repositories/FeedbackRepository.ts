import { prisma } from "../prisma";

export class FeedbackRepository {
  async create(data: {
    comment: string;
    projectId: number;
  }) {
    return prisma.feedback.create({
      data,
    });
  }
}