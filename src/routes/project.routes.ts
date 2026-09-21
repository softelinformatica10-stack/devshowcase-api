import { Router, NextFunction } from "express";

import { ProjectController } from "../controllers/ProjectController";
import { FeedbackController } from "../controllers/FeedbackController";

const projectRouter = Router();

const projectController = new ProjectController();
const feedbackController = new FeedbackController();

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Cadastra um novo projeto
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - url
 *               - profileId
 *             properties:
 *               title:
 *                 type: string
 *                 example: DevShowcase API
 *               description:
 *                 type: string
 *                 example: API para apresentação de projetos de desenvolvimento
 *               url:
 *                 type: string
 *                 format: uri
 *                 example: https://github.com/exemplo/projeto
 *               profileId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Projeto cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 */

projectRouter.post("/", (req, res, next: NextFunction) => {
  projectController.create(req, res, next);
});

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Lista os projetos
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: technology
 *         schema:
 *           type: string
 *         description: Filtra projetos por tecnologia
 *         example: Node.js
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Quantidade de projetos por página
 *     responses:
 *       200:
 *         description: Lista de projetos
 */

projectRouter.get("/", (req, res) => {
  projectController.findAll(req, res);
});

/**
 * @swagger
 * /api/projects/{id}/feedbacks:
 *   post:
 *     summary: Cadastra um feedback para um projeto
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do projeto
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *               - comment
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: Excelente projeto!
 *     responses:
 *       201:
 *         description: Feedback cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Projeto não encontrado
 */

projectRouter.post("/:id/feedbacks", (req, res) => {
  feedbackController.create(req, res);
});

/**
 * @swagger
 * /api/projects/{id}/upvote:
 *   put:
 *     summary: Registra um upvote no projeto
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do projeto
 *         example: 1
 *     responses:
 *       200:
 *         description: Upvote registrado com sucesso
 *       404:
 *         description: Projeto não encontrado
 */

projectRouter.put("/:id/upvote", (req, res) => {
  projectController.upvote(req, res);
});

export default projectRouter;