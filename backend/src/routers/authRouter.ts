import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { ErrorHandler } from "../middlewares/ErrorHandler";

const authController = new AuthController();

const authRouter = Router();

authRouter.post("/register", ErrorHandler.catchErrors(authController.register));
authRouter.get("/confirm-account/:token", ErrorHandler.catchErrors(authController.confirmAccount));
authRouter.post("/login", ErrorHandler.catchErrors(authController.login));

export default authRouter;
