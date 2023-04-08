import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { ErrorHandler } from "../middlewares/ErrorHandler";

const authController = new AuthController()

const authRouter = Router()

authRouter.post("/register", ErrorHandler.catchErrors(authController.register))


export default authRouter