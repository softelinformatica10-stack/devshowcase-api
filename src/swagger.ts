import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DevShowcase API",
      version: "1.0.0",
      description: "API para apresentação de projetos de desenvolvimento."
    },
   servers: [
  {
    url: process.env.RENDER_EXTERNAL_URL || "http://localhost:3333"
  }
]
  },
  apis: ["./src/routes/*.ts"]
});