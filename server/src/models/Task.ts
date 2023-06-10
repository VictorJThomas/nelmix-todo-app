import mongoose, { Document, Schema } from "mongoose";

// * Tasks Model
interface TaskDocument extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  completed: boolean;
}

const taskSchema = new Schema<TaskDocument>({
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
});
