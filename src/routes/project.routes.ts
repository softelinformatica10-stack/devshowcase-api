import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";

const projectRouter = Router();

const projectController = new ProjectController();

projectRouter.post("/", (req, res) => {
  projectController.create(req, res);
});

projectRouter.get("/", (req, res) => {
  projectController.findAll(req, res);
});

export default projectRouter;