import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, IUser, ProfileAccess, IProfileAccess } from "../models/User";
import { schedule } from "node-cron";

// Generate JWT token
function generateToken(userId: string): string {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "30min",
  });
  return token;
}

// Expiration Advice
function sendExpirationAdvice(profileId: string) {
  const expirationTime = new Date(Date.now() + 30 * 60 * 1000);
  const adviceTime = new Date(expirationTime.getTime() - 5 * 60 * 1000);
  const cronExpression = `${adviceTime.getMinutes()} ${adviceTime.getHours()} ${adviceTime.getDate()} ${adviceTime.getMonth() + 1} *`;

  schedule(cronExpression, async () => {
    // Get Temporary Profile
    const temporaryProfile = await ProfileAccess.findById(profileId);
    if (temporaryProfile) {
      console.log('Sending advice before expiration: ', temporaryProfile);
      // You can implement your logic to send the expiration advice to the user here
    }
  });
}

export const registerUser = async (req: Request, res: Response) => {
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

export const loginAsGuest = async (req: Request, res: Response) => {
  try {
    const { temporaryProfileId } = req.body;

    // Find temporary profile in database
    const temporaryProfile = await ProfileAccess.findById(temporaryProfileId);
    if (!temporaryProfile) {
      return res.status(404).json({ error: "Temporary profile not found" });
    }

    // Check if the temporary profile is expired
    const currentTime = Date.now();
    if (temporaryProfile.expiresAt.getTime() < currentTime) {
      // Temporary profile has expired, delete it and return an error
      await temporaryProfile.deleteOne();
      return res.status(401).json({ error: "Temporary profile has expired" });
    }

    // Find the associated user for the temporary profile
    const user = await User.findById(temporaryProfile.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a JWT token
    const token = generateToken(user._id);

    // Log the profile access
    const profileAccess: IProfileAccess = new ProfileAccess({
      userId: user._id,
      profileType: "Temporary",
      accessedAt: new Date(),
    });
    await profileAccess.save();

    // Schedule expiration advice
    sendExpirationAdvice(temporaryProfile._id);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to login as a guest" });
  }
};
