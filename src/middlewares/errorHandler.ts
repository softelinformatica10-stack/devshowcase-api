import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const error = new Error(
    `Rota não encontrada: ${req.method} ${req.originalUrl}`
  );

  (error as any).statusCode = 404;

  next(error);
}

export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      status: 400,
      message: "Dados inválidos.",
      errors: error.issues
    });
  }

  const statusCode = error.statusCode || 500;

  return res.status(statusCode).json({
    status: statusCode,
    message: error.message || "Erro interno do servidor."
  });
}