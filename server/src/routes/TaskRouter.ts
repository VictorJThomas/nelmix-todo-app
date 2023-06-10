import { Router } from "express";
import { authenticateUser, checkAuthorization } from "../middlewares/auth";
import {
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/TaskController";

const taskRouter = Router();

// Get Task by Id
taskRouter.get("/:taskId", authenticateUser, checkAuthorization, getTask);

// Create new Task
taskRouter.post("/", authenticateUser, createTask);

// Update Task
taskRouter.put("/:taskId", authenticateUser, checkAuthorization, updateTask);

// Delete Task
taskRouter.delete("/:taskId", authenticateUser, checkAuthorization, deleteTask);

export default taskRouter;
