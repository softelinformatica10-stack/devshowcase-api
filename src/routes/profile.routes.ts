import { Router } from "express";
import { ProfileController } from "../controllers/ProfileController";

const profileRouter = Router();

const profileController = new ProfileController();

/**
 * @swagger
 * /api/profiles:
 *   post:
 *     summary: Cadastra um novo perfil
 *     tags: [Profiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *           properties:
 *             name:
 *               type: string
 *               example: José Nazário
 *             email:
 *               type: string
 *               format: email
 *               example: jose@email.com
 *             bio:
 *               type: string
 *               example: Desenvolvedor de sistemas
 *     responses:
 *       201:
 *         description: Perfil cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 */

profileRouter.post("/", (req, res) => {
  profileController.create(req, res);
});

/**
 * @swagger
 * /api/profiles/{id}:
 *   get:
 *     summary: Busca um perfil pelo ID
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do perfil
 *         example: 1
 *     responses:
 *       200:
 *         description: Perfil encontrado com sucesso
 *       404:
 *         description: Perfil não encontrado
 */

profileRouter.get("/:id", (req, res) => {
  profileController.findById(req, res);
});

export default profileRouter;