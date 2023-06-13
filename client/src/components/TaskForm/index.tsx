import { useState } from "react";
import axios from "axios";
import { Box, Button, TextField } from "@mui/material";
import { addTask } from "../../redux/slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addGuestTask } from "../../redux/slices/authSlice";

type TaskFormProps = {
  onSubmit: () => void;
};

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const isGuest = useSelector((state: RootState) => state.auth.isGuest);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isGuest) {
      dispatch(addGuestTask({
        title, description,
        id: ""
      })); // Dispatch addGuestTask
      onSubmit();
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/task/",
          { title, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(response.data); // Log the response for testing purposes
        dispatch(addTask(response.data));
        onSubmit(); // Call the onSubmit callback to notify the parent component
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        required
        multiline
        rows={4}
        margin="normal"
      />
      <Button type="submit" variant="contained">
        Add Task
      </Button>
    </Box>
  );
};
