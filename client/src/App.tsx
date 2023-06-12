import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRouter } from "./router";

// const ProtectedTaskPage = withAuth(TasksPage, true);
// const ProtectedProfileAccessPage = withAuth(ProfileAccessPage, true)

function App(){
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App;