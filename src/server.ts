

import express from "express";
import profileRouter from "./routes/profile.routes";
import technologyRouter from "./routes/technology.routes";
import projectRouter from "./routes/project.routes";

const app = express();

app.use(express.json());

app.use("/api/profiles", profileRouter);
app.use("/api/technologies", technologyRouter);
app.use("/api/projects", projectRouter);

app.get("/health", (req, res) => {
  res.json({
    message: "DevShowcase API está funcionando!"
  });
});

app.listen(3333, () => {
  console.log("DevShowcase API rodando na porta 3333");
});