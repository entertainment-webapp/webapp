import cors from "cors";
import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";

export default function configureApp() {
  const app: Application = express();

  // middlewares
  app.use(cors());
  app.use(morgan("dev"));

  // end middlewares

  app.use("/hello", (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
      message: "Initial setup",
    });
  });

  return app;
}
