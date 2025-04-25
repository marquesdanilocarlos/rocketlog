import {Router} from "express";
import AuthController from "@/controllers/AuthController";

const authRouter: Router = Router();
const authController = new AuthController();

authRouter.post("/", authController.login);

export default authRouter;