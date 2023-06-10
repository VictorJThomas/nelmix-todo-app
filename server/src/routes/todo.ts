import express, { Request, Response } from 'express';
import { Todo } from '../models/todo';

const router = express.Router();

// GET /api/todos
router.get('/', (req: Request, res: Response) => {
  // Your logic to fetch todos from the database
  const todos: Todo[] = [];

  res.json(todos);
});

// POST /api/todos
router.post('/', (req: Request, res: Response) => {
  const { title } = req.body;

  // Your logic to create a new todo in the database
  const todo: Todo = {
    id: 1,
    title,
    completed: false
  };

  res.status(201).json(todo);
});

// PUT /api/todos/:id
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  // Your logic to update the todo in the database
  const updatedTodo: Todo = {
    id: parseInt(id),
    title,
    completed
  };

  res.json(updatedTodo);
});

// DELETE /api/todos/:id
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  // Your logic to delete the todo from the database

  res.sendStatus(204);
});

export default router;
