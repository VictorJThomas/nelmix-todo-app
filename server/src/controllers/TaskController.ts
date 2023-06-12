import { Request, Response } from "express";
import { Task } from "../models/Task";
import { User } from "../models/User";

// Interface to include additional propertis
interface AuthenticatedRequest extends Request {
  userId?: string;
}

// Get all Task 
export const getTasks = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.userId;

    // Find user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Retrieve tasks associated with the user
    const tasks = await Task.find({ userId: user._id });

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Create Task
export const createTask = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, description } = req.body;
    const userId = req.userId;

    const newTask = new Task({
      title,
      description,
      userId,
    });

    await newTask.save();

    await User.findByIdAndUpdate(userId, { $push: { tasks: newTask._id } });

    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error to create task" });
  }
};

// Update Task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskId;
    const { title, description } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error to update task" });
  }
};

// Delete Task
export const deleteTask = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const taskId = req.params.taskId;

    await User.findByIdAndUpdate(req.userId, { $pull: { tasks: taskId } });

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error to delete task" });
  }
};
