import express, { Router } from "express";
import { registerUser, loginUser } from "../controllers/AuthController";

const authRouter: Router = express.Router();

// Register a User
authRouter.post("/register", registerUser);


// Login with existent Profile
authRouter.post("/login", loginUser);

export default authRouter;
