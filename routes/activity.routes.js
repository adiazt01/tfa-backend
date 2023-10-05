import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  createActivity,
  deleteActivity,
  getActivities,
  updateActivity,
  getActivity,
} from "../controllers/activity.controller.js";
import { checkProject } from "../middlewares/project.middlewares.js";

export const activityRoutes = Router();

activityRoutes.get(
  "/:id_project/activities",
  [authRequired, checkProject],
  getActivities
);
activityRoutes.get(
  "/:id_project/activity/:id_activity",
  authRequired,
  getActivity
);

activityRoutes.post(
  "/:id_project/activity",
  [authRequired, checkProject],
  createActivity
);
activityRoutes.put(
  "/:id_project/activity/:id_activity",
  [authRequired, checkProject],
  updateActivity
);
activityRoutes.delete(
  "/:id_project/activity/:id_activity",
  [authRequired, checkProject],
  deleteActivity
);
