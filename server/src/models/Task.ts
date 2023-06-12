import mongoose, { Document, Schema } from "mongoose";

// * Tasks Model
interface ITask extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  completed: boolean;
  description?: string;
}

const taskSchema = new Schema<ITask>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  description: { 
    type: String 
  },
});

export const Task = mongoose.model<ITask>("Task", taskSchema)
