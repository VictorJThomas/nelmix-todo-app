import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { Task } from "../models/Task";
import { Types } from "mongoose";

// Interface to include additional properties
interface AuthenticatedRequest extends Request {
  userId?: string;
}

// User Authentication
export const authenticateUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Authorization token not found" });
    }

    // Token verification
    const decodedToken: any = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    // Add userId to request object
    req.userId = decodedToken.userId;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid Token" });
  }
};

// Check if user is authorized to access a resource
export const checkAuthorization = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const taskId = req.params.taskId;

    // Find the task by taskId
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (!task.userId.equals(new Types.ObjectId(userId))) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
