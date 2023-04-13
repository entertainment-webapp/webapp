import cors from "cors";
import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import authRouter from "./routers/authRouter";
import bodyParser from "body-parser";
import { ResponseUtil } from "./utils/Response";
import { ErrorHandler } from "./middlewares/ErrorHandler";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export default function configureApp() {
  const app: Application = express();

  // middlewares
  app.use(cors());
  app.use(morgan("dev"));
  app.use(bodyParser.json());

  // end middlewares

  // routers
  app.use("/auth", authRouter);

  // end routers

  app.use("*", (req: Request, res: Response) => {
    return ResponseUtil.sendError(
      res,
      "Item/page you are looking for does not exist",
      StatusCodes.NOT_FOUND,
      ReasonPhrases.NOT_FOUND
    );
  });

  // Define a middleware function to handle errors
  app.use(ErrorHandler.handleErrors);

  return app;
}
