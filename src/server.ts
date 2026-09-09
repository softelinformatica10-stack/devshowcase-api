import express from "express";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    message: "DevShowcase API está funcionando!"
  });
});

app.listen(3333, () => {
  console.log("DevShowcase API rodando na porta 3333");
});