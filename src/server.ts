import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import express from "express";
import profileRouter from "./routes/profile.routes";
import technologyRouter from "./routes/technology.routes";
import projectRouter from "./routes/project.routes";

import {
  notFoundHandler,
  errorHandler
} from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/profiles", profileRouter);
app.use("/api/technologies", technologyRouter);
app.use("/api/projects", projectRouter);

app.get("/health", (req, res) => {
  res.json({
    message: "DevShowcase API está funcionando!"
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`DevShowcase API rodando na porta ${PORT}`);
});