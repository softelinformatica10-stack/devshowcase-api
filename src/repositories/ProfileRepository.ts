import { prisma } from "../prisma";

export class ProfileRepository {
  async create(data: {
    name: string;
    email: string;
    bio?: string;
  }) {
    return prisma.profile.create({
      data,
    });
  }

  async findById(id: number) {
    return prisma.profile.findUnique({
      where: {
        id,
      },
    });
  }
}