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

interface LoginAsGuestRequestDTO {
  temporaryProfileId: string;
}

interface LoginUser {
  username: string;
  password: string;
}

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
  const cronExpression = `${adviceTime.getMinutes()} ${adviceTime.getHours()} ${adviceTime.getDate()} ${
    adviceTime.getMonth() + 1
  } *`;

  schedule(cronExpression, async () => {
    // Get Temporary Profile
    const temporaryProfile = await ProfileAccess.findById(profileId);
    if (temporaryProfile) {
      console.log("Sending advice before expiration: ", temporaryProfile);
      // You can implement your logic to send the expiration advice to the user here
    }
  });
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
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "30min",
      }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to login" });
  }
};

// Create a Temporary Profile
export const createTemporaryProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // Create a new user
    const newUser: IUser = new User({
      username: 'guest',
      passwordHash: '',
      isTemporary: true,
      tasks: [],
    });

    // Save the new user
    const savedUser: IUser = await newUser.save();

    // Create a profile access record
    const profileAccess: IProfileAccess = new ProfileAccess({
      userId: savedUser._id,
      profileType: 'temporary',
      accessedAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 60 * 1000), // Set expiration time to 30 minutes from now
    });

    // Save the profile access record
    await profileAccess.save();

    const expirationTime = new Date(profileAccess.expiresAt.getTime() - 5 * 60 * 1000);
    const cronExpression = `${expirationTime.getMinutes()} ${expirationTime.getHours()} ${expirationTime.getDate()} ${expirationTime.getMonth() + 1} *`;

    cron.schedule(cronExpression, async () => {
      // Obtener el perfil temporal
      const temporaryProfile = await ProfileAccess.findById(profileAccess._id);
      if (temporaryProfile) {
        console.log('Enviando notificación antes de la expiración:', temporaryProfile);
        // Implementa aquí la lógica para enviar la notificación de expiración al usuario
      }
    });

    res.status(201).json({ message: 'Perfil temporal creado exitosamente' });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: 'An error occurred while creating the temporary profile.' });
  }
};