import { useSelector } from "react-redux";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { TasksPage } from "./pages/TasksPage";
import { ProfilesPage } from "./pages/ProfilesPage";
import { RootState } from "./redux/store";
import { useEffect } from "react";
import { useNotification } from "./context/notificationContext";

export const AppRouter = () => {
  const isAuth = useSelector((state: RootState) => state.auth.token !== null);
  const isGuest = useSelector((state: RootState) => state.auth.isGuest);
  const navigate = useNavigate();
  const location = useLocation();
  const { getError } = useNotification();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;

    // Check if the user is a guest and session is about to end in 5 minutes
    if (isGuest && location.pathname !== "/") {
      timeoutId = setTimeout(() => {
        getError(
          "Your guest session is about to end. Please log in to continue."
        );
      }, 25 * 60 * 1000); // 25 minutes

      // Redirect to login page after 30 minutes
      setTimeout(() => {
        navigate("/");
      }, 30 * 60 * 1000); // 30 minutes
    }

    return () => clearTimeout(timeoutId);
  }, [getError, isGuest, location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      {isAuth ? (
        <>
          <Route
            path="/home"
            element={isGuest ? <TasksPage isGuest={isGuest} /> : <TasksPage />}
          />
          <Route
            path="/profile"
            element={
              isGuest ? <ProfilesPage isGuest={isGuest} /> : <ProfilesPage />
            }
          />
        </>
      ) : (
        <Route
          path="*"
          element={isGuest ? <TasksPage isGuest={isGuest} /> : <LoginPage />}
        />
      )}
    </Routes>
  );
};