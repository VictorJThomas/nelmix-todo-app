/**
 * Root Router
 * For Redirections to Router
 */

import express, {Request, Response} from "express";

// Server instance
let app = express();
let rootRouter = express.Router();
const PORT = process.env.PORT || 3000;

rootRouter.get("/", (req: Request, res: Response) => {
    res.send(
        `MongoDB connection succeed. Listening in port ${PORT}`
    )
})