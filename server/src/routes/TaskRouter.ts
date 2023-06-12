import { Router } from "express";
import { authenticateUser, checkAuthorization } from "../middlewares/auth";
import {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
} from "../controllers/TaskController";

const taskRouter = Router();

// Get all Tasks
taskRouter.get("/", authenticateUser, getTasks);

// Create new Task
taskRouter.post("/", authenticateUser, createTask);

// Update Task
taskRouter.put("/:taskId", authenticateUser, checkAuthorization, updateTask);

// Delete Task
taskRouter.delete("/:taskId", authenticateUser, checkAuthorization, deleteTask);

export default taskRouter;
