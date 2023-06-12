import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";
import { NotificationProvider } from "./context/notificationContext";

// const ProtectedTaskPage = withAuth(TasksPage, true);
// const ProtectedProfileAccessPage = withAuth(ProfileAccessPage, true)

function App(){
  return (
    <NotificationProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </NotificationProvider>
  )
}

export default App;