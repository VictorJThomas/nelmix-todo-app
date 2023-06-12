import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { TasksPage } from "./pages/TasksPage";
import {ProfilesPage} from "./pages/ProfilesPage"
import { RootState } from "./redux/store";

export const AppRouter = () => {
  const isAuth = useSelector((state: RootState) => state.auth.token !== null);
  const isGuest = useSelector((state: RootState) => state.auth.isGuest);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/home"
        element={isGuest ? <TasksPage isGuest={isGuest} /> : <TasksPage />}
      />
      <Route
        path="/profile"
        element={isGuest ? <ProfilesPage isGuest={isGuest} /> : <ProfilesPage />}
      />
    </Routes>
  );
};

