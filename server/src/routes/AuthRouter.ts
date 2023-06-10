import express, { Router } from 'express';
import { registerUser, loginAsGuest } from '../controllers/AuthController';

const authRouter: Router = express.Router();

// Register a User
authRouter.post('/register', registerUser);

// Login with a Temporary Profile
authRouter.post('/login/guest', loginAsGuest);

export default authRouter;
