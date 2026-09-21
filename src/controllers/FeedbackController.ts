import { Request, Response } from "express";
import { FeedbackRepository } from "../repositories/FeedbackRepository";

const feedbackRepository = new FeedbackRepository();

export class FeedbackController {
  async create(req: Request, res: Response) {
    try {
      const projectId = Number(req.params.id);
      const { rating, comment } = req.body;

      if (!projectId || !rating || !comment) {
        return res.status(400).json({
          message: "Projeto, nota e comentário são obrigatórios."
        });
      }

      if (rating < 1 || rating > 5) {
        return res.status(400).json({
          message: "A nota deve estar entre 1 e 5."
        });
      }

      const feedback = await feedbackRepository.create({
        rating,
        comment,
        projectId
      });

      const averageRating =
        await feedbackRepository.calculateAverageRating(projectId);

      await feedbackRepository.updateProjectAverage(
        projectId,
        averageRating
      );

      return res.status(201).json({
        message: "Feedback cadastrado com sucesso.",
        feedback,
        averageRating
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Erro ao cadastrar feedback."
      });
    }
  }
}