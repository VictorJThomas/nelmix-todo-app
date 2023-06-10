import express, {Router} from 'express';
import {
    getUserRegistry
  } from '../controllers/UserController';

const userRouter: Router = express.Router();

// Get User by Id
userRouter.get('/registry', getUserRegistry);



export default userRouter;


