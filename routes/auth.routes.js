import { Router } from "express";
import {
  login,
  logout,
  register,
  verifyToken,
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validaror.middlewares.js";
import { loginSchema, registerSchema } from "../schemas/user.schema.js";

export const routesAuth = Router();

routesAuth.post("/register", validateSchema(registerSchema), register);
routesAuth.post("/login", validateSchema(loginSchema), login);
routesAuth.post("/logout", logout);
routesAuth.get("/verify-token", verifyToken);
