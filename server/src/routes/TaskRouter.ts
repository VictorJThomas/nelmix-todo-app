import { Router } from "express";
import { authenticateUser, checkAuthorization } from "../middlewares/auth";
import {
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/TaskController";

const tasRouter = Router();

// Get Task by Id
tasRouter.get("/:taskId", authenticateUser, checkAuthorization, getTask);

// Create new Task
tasRouter.post("/", authenticateUser, createTask);

// Update Task
tasRouter.put("/:taskId", authenticateUser, checkAuthorization, updateTask);

// Delete Task
tasRouter.delete("/:taskId", authenticateUser, checkAuthorization, deleteTask);

export default tasRouter;
