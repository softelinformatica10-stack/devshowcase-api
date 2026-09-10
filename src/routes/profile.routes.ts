import { Router } from "express";
import { ProfileController } from "../controllers/ProfileController";

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.post("/", (req, res) => {
  profileController.create(req, res);
});

profileRouter.get("/:id", (req, res) => {
  profileController.findById(req, res);
});

export default profileRouter;