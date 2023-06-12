import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { NavBar } from "../../common/NavBar";
import { TaskForm } from "../../components";
import { TaskCard } from "../../components";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addTask, setTasks } from "../../redux/slices/taskSlice";
import { setGuestTasks } from "../../redux/slices/authSlice";

type TasksPageProps = {
  isGuest?: boolean;
};

type Task = {
  id: string;
  title: string;
  description: string;
};

export const TasksPage: React.FC<TasksPageProps> = ({ isGuest }) => {
  const tasks = useSelector((state: RootState) =>
    isGuest ? state.auth.guestTasks : state.tasks.tasks
  );
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/task/",
        config
      );
      dispatch(setTasks(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGuestTasks = () => {
    const guestTasks = JSON.parse(localStorage.getItem("guestTasks") || "[]");
    console.log(guestTasks); // Log guest tasks for testing purposes
    dispatch(setGuestTasks(guestTasks));
  };

  const handleTaskSubmit = async () => {
    if (isGuest) {
      fetchGuestTasks();
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/task/",
          config
        );
        console.log(response.data); // Log the response for testing purposes
        dispatch(addTask(response.data));
      } catch (error) {
        console.error(error);
      }
      fetchTasks();
    }
  };

  useEffect(() => {
    if (isGuest) {
      fetchGuestTasks();
    } else {
      fetchTasks();
    }
  }, []);
  return (
    <>
      <NavBar />
      <Container maxWidth="xl">
        <Box
          textAlign="center"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="30vh"
        >
          <Typography fontSize="2rem">Welcome to your TO-DO app.</Typography>
        </Box>
        <Box display="flex" justifyContent="center" mt={-5}>
          <Grid container spacing={2} direction="row" justifyContent="center">
            <Grid item xs={12} md={6} lg={4}>
              <Box display="flex" justifyContent="center">
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div" mb={2}>
                      Add Task
                    </Typography>
                    <TaskForm onSubmit={handleTaskSubmit} />
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box display="flex" justifyContent="center" mt={4}>
          {/* Container to display all tasks */}
          {/* Replace with your actual task display component */}
          <Container maxWidth="md">
            <Typography variant="h6" component="div">
              All Tasks
            </Typography>
            {tasks.map((task) => (
              <TaskCard
                key={`${task.id}-${task.title}`}
                title={task.title}
                description={task.description}
              />
            ))}
          </Container>
        </Box>
      </Container>
    </>
  );
};

export default TasksPage;
