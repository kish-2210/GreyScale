import {Router} from "express";
import { login, signup , getUserInfo, logout , updateProfile } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const authRoutes = Router();

authRoutes.post("/signup",signup);
authRoutes.post("/login",login);
authRoutes.get("/user-info",verifyToken,getUserInfo)
authRoutes.post("/logout",logout)
authRoutes.post("/update-profile",verifyToken,updateProfile)

export default authRoutes;