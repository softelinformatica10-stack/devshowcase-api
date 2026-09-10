import { Router } from "express";
import { TechnologyController } from "../controllers/TechnologyController";

const technologyRouter = Router();

const technologyController = new TechnologyController();

technologyRouter.post("/", (req, res) => {
  technologyController.create(req, res);
});

technologyRouter.get("/", (req, res) => {
  technologyController.findAll(req, res);
});

export default technologyRouter;