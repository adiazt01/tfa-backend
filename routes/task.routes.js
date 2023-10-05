import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/task.controller.js";
import { checkActivity } from "../middlewares/task.middlewares.js";
import { checkProject } from "../middlewares/project.middlewares.js";

export const taskRoutes = Router();

taskRoutes.get(
  "/:id_project/activity/:id_activity/tasks",
  [authRequired, checkProject, checkActivity],
  getTasks
);
taskRoutes.get(
  "/:id_project/activity/:id_activity/task/:id_task",
  [authRequired, checkProject, checkActivity],
  getTask
);

taskRoutes.post(
  "/:id_project/activity/:id_activity/task",
  [authRequired, checkProject, checkActivity],
  createTask
);
taskRoutes.put(
  "/:id_project/activity/:id_activity/task/:id_task",
  [authRequired, checkProject, checkActivity],
  updateTask
);
taskRoutes.delete(
  "/:id_project/activity/:id_activity/task/:id_task",
  [authRequired, checkProject, checkActivity],
  deleteTask
);
