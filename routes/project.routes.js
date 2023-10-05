import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "../controllers/project.controller.js";

export const projectRoutes = Router();

projectRoutes.get("/projects", authRequired, getProjects);
projectRoutes.get("/project/:id_project", authRequired, getProject);
projectRoutes.post("/project", authRequired, createProject);
projectRoutes.delete("/project/:id", authRequired, deleteProject)
projectRoutes.put("/project/:id", authRequired, updateProject)
