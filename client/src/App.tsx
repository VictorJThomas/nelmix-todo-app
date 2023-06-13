import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";
import { NotificationProvider } from "./context/notificationContext";

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