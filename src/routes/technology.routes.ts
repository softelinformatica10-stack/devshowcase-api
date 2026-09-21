import { Router } from "express";
import { TechnologyController } from "../controllers/TechnologyController";

const technologyRouter = Router();

const technologyController = new TechnologyController();

/**
 * @swagger
 * /api/technologies:
 *   post:
 *     summary: Cadastra uma nova tecnologia
 *     tags: [Technologies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Node.js
 *     responses:
 *       201:
 *         description: Tecnologia cadastrada com sucesso
 *       400:
 *         description: Dados inválidos
 */

technologyRouter.post("/", (req, res) => {
  technologyController.create(req, res);
});

/**
 * @swagger
 * /api/technologies:
 *   get:
 *     summary: Lista todas as tecnologias
 *     tags: [Technologies]
 *     responses:
 *       200:
 *         description: Lista de tecnologias
 */

technologyRouter.get("/", (req, res) => {
  technologyController.findAll(req, res);
});

export default technologyRouter;