import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, IUser, ProfileAccess, IProfileAccess } from "../models/User";
import cron, { schedule } from "node-cron";

// DTO Endpoints

interface RegisterUserRequestDTO {
  username: string;
  password: string;
}

interface LoginUser {
  username: string;
  password: string;
}

export const registerUser = async (
  req: Request<{}, {}, RegisterUserRequestDTO>,
  res: Response
) => {
  try {
    const { username, password } = req.body;

    // Check if User Exists
    const isUser = await User.findOne({ username });
    if (isUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const newUser: IUser = new User({
      username,
      passwordHash: hashedPassword,
      isTemporary: false,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register user" });
  }
};

export const loginUser = async (
  req: Request<{}, {}, LoginUser>,
  res: Response
) => {
  try {
    const { username, password } = req.body;

    // Check if User Exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare Password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string);
    const userWithoutPassword = { ...user.toObject(), passwordHash: undefined };

    res.status(200).json({ token, user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to login" });
  }
};
