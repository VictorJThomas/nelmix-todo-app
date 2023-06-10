import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import rootRouter from './routes';

dotenv.config();

const app: Express = express();

// Content Type Config
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

const PORT = process.env.PORT || 3000;

// Mongoose Connection
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    app.get('/', (req: Request, res: Response) => {
      res.redirect('/api');
    });

    app.use('/api', rootRouter);

    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}/`);
      console.log(`Redirecting to http://localhost:${PORT}/api`);
    });
  })
  .catch((error) => console.log(`${error} did not connect`));
