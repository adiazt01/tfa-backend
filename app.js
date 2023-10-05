import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { routesAuth } from "./routes/auth.routes.js";
import { taskRoutes } from "./routes/task.routes.js";
import { projectRoutes } from "./routes/project.routes.js";
import { activityRoutes } from "./routes/activity.routes.js";

export const App = express();

dotenv.config();
App.use(cors({
    origin: 'http://localhost:5173', credentials: true
}))
App.use(express.json());
App.use(cookieParser())
App.use(morgan("dev"));

App.use("/api/auth", routesAuth);
App.use("/api", projectRoutes)
App.use("/api/project", activityRoutes)
App.use("/api/project", taskRoutes);

