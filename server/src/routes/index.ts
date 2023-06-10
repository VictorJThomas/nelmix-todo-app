/**
 * Root Router
 * For Redirections to Router
 */

import express, { Request, Response } from "express";
import userRouter from "./UserRouter";
import authRouter from "./AuthRouter";

// Server instance
let app = express();

// Router instance
let rootRouter = express.Router();
const PORT = process.env.PORT || 3000;

rootRouter.get("/", (req: Request, res: Response) => {
  res.send(`MongoDB connection succeed. Listening in port ${PORT}`);
});

app.use("/", rootRouter); // http://localhost:8000/api/
app.use('/user', userRouter) 
app.use('/auth', authRouter) // http://localhost:8000/api/auth
// app.use('/task', taskRouter) // http://localhost:8000/api/task